import jwtDecode from "jwt-decode";
import {CLIENT_ID, CLIENT_SECRET, TIMEOUT, VK_CLIENT_ID, VK_CLIENT_SECRET} from "./OauthConstants";
import axios from "axios/lib/axios";
import {backoff} from "../../utils/backoff";
import {isClient, isSSR} from "../../utils/ssr-util";
import {httpError} from "../snackbar-service/snackbarAction";
import {securedGet} from "./xhr";

const ACCESS_TOKEN = "access_token";
const REFRESH_TOKEN = "refresh_token";
const VK_TOKEN = "vk_token";

let createTokenRequest = function () {
  return axios.create({
    headers: {
      "Authorization": 'Basic ' + btoa(decodeURIComponent(
        encodeURIComponent(CLIENT_ID + ":" + CLIENT_SECRET))),
      "Content-Type": 'application/x-www-form-urlencoded'
    }
  });
};
//TODO: request implicit token
export const requestVkToken = (code) => (dispatch) => {
  const params = {
    client_id: VK_CLIENT_ID,
    client_secret: VK_CLIENT_SECRET,
    code: code,
    redirect_uri: process.env.LOGIN_URL_VK,
  };
  return new Promise((resolve, reject) => {
    axios.get('/vk/access_token', {params: params}).then(response => {
      let vkToken = response.data;
      getLocalStorage().setItem("vk_token", vkToken.access_token);

      return axios.post('/uaa/vk-auth',
        {token: vkToken.access_token, userId: vkToken.user_id}).then(
        response => {
          let token = response.data;
          setTokens(token.access_token, token.refresh_token);
          resolve(getTargetUrl());
        }).catch(error => {
        if (error) {
          dispatch(httpError(error.response.status, error.response.statusText));
          reject(error);
        }
      });

    }).catch(error => {
      if (error) {
        dispatch(httpError(error.response.status, error.response.statusText));
        reject(error);
      }
    });
  });
};

export const authType = () => {
  //tODO: export to const
  if (getLocalStorage().getItem(VK_TOKEN)) {
    return "VK";
  } else {
    return "internal";
  }
};

export const requestToken = (code) => {

  let tokenRequest = createTokenRequest();

  const params = {
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: process.env.LOGIN_URL,
  };
  const searchParams = createUrlFormEncoded(params);

  return tokenRequest.post('/uaa/oauth/token', searchParams).then(response => {
    let token = response.data;
    setTokens(token.access_token, token.refresh_token);
    return getTargetUrl();
  }).catch(error => {
    if (error) {
      console.log('//TODO: redirect to error page');
    }
  });
};

export const redirectToAuthService = () => {
  if (isClient()) {
    rememberTargetUrl(window.location.pathname);
    window.location.href = process.env.AUTH_SERVER_URL
      + '/uaa/oauth/authorize?client_id=' + CLIENT_ID + '&redirect_uri='
      + process.env.LOGIN_URL + '&response_type=code&scope=resource-read';
  }
};
export const redirectToVkAuthService = () => {
  if (isClient()) {
    rememberTargetUrl(window.location.pathname);
    window.location.href = "https://oauth.vk.com/authorize?client_id="
      + VK_CLIENT_ID + "&display=page&redirect_uri="
      + process.env.LOGIN_URL_VK + "&scope=status,offline&response_type=code&v="
      + process.env.VK_API_VERSION;
  }
};
const rememberTargetUrl = (url) => {
  getLocalStorage().targetUrl = url.replace("/app", "");
};
export const getTargetUrl = () => {
  return getLocalStorage().targetUrl;
};
export const isAuthed = () => {
  if (isSSR()) {
    return true;
  }
  return !(isAccessTokenExpired(getAccessToken()) && isRefreshTokenExpired(
    getRefreshToken()));
};

export const logout = () => {
  //tODO: location from parameters
  removeTokens();
  if (isClient()) {
    window.location.href = "/app/";
  }
};

function getLocalStorage() {
  if (isClient()) {
    return localStorage;
  } else {
    return {
      getItem: (string) => string,
      setItem: (string, string2) => {
      }
    };
  }
}

export const getAccessToken = () => getLocalStorage().getItem(
  ACCESS_TOKEN);

export const getRefreshToken = () => getLocalStorage().getItem(REFRESH_TOKEN);

export const setAccessToken = access_token => {
  getLocalStorage().setItem(ACCESS_TOKEN, access_token);
};

export const setRefreshToken = refresh_token => {
  getLocalStorage().setItem(REFRESH_TOKEN, refresh_token);
};

export const setTokens = (access_token, refersh_token) => {
  setAccessToken(access_token);
  setRefreshToken(refersh_token);
};

export const removeAccessToken = () => {
  getLocalStorage().removeItem(ACCESS_TOKEN);
};

export const removeRefreshToken = () => {
  getLocalStorage().removeItem(REFRESH_TOKEN);
};

export const removeVkToken = () => {
  getLocalStorage().removeItem(VK_TOKEN);
};

export const removeTokens = () => {
  removeAccessToken();
  removeRefreshToken();
  removeVkToken();
};

export const isAccessTokenExpired = token => isTokenExpired(token);

export const isRefreshTokenExpired = token => isTokenExpired(token);

export const isTokenExpired = token => {
  if (!token || token === null || token === undefined || token === "null"
    || token === "undefined") {
    return true;
  }
  if (isClient()) {
    try {
      const {exp} = jwtDecode(token);
      // exp in seconds
      // token is expired if lifetime smaller then connection timeout
      return (exp * 1000 - Date.now()) < TIMEOUT;
    } catch (e) {
      return true;
    }
  } else {
    return true;
  }
};

export const validateAndUpdateTokenIfNecessary = () => {
  return new Promise((resolve, reject) => {
    const access_token = getAccessToken();
    const refresh_token = getRefreshToken();

    if (isAccessTokenExpired(access_token) &&
      !isRefreshTokenExpired(refresh_token)) {
      backoff(
        () => refreshToken(refresh_token),
        {
          attempts: 8,
          minDelay: 1000,
          maxDelay: 10000
        }
      ).then((token) => {
          if (token) {
            setTokens(token.access_token, token.refresh_token);
            resolve();
          } else {
            reject();
          }
        }
      ).catch(err => {
        reject(err);
      });
    } else if (
      isAccessTokenExpired(access_token) &&
      isRefreshTokenExpired(refresh_token)) {
      reject(window.location.pathname);
    } else {
      resolve();
    }
  });
};

let createUrlFormEncoded = function (params) {
  return Object.keys(params).map((key) => {
    return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
  }).join('&');
};
export const refreshToken = (refresh_token) => {
  let tokenRequest = createTokenRequest();

  const params = {
    grant_type: 'refresh_token',
    refresh_token: refresh_token,
  };
  const searchParams = createUrlFormEncoded(params);

  return tokenRequest.post('/uaa/oauth/token', searchParams)
    .then(response => {
      return response.data;
    }).catch(error => {
      console.log(error);
    });
};

export const registerIfNecessary = () => (dispatch) => {
  return dispatch(securedGet(process.env.API_URL + '/resource/register-if-necessary/'));
};
