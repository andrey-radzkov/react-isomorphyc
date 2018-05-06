import jwtDecode from "jwt-decode";
import {CLIENT_ID, CLIENT_SECRET, TIMEOUT} from "./Oauth";
import axios from "axios";
import {backoff} from "../utils/backoff";
import {isClient, isSSR} from "../utils/ssr-util";

const ACCESS_TOKEN = "access_token";
const REFRESH_TOKEN = "refresh_token";

let createTokenRequest = function () {
  return axios.create({
    headers: {
      "Authorization": 'Basic ' + btoa(decodeURIComponent(
        encodeURIComponent(CLIENT_ID + ":" + CLIENT_SECRET))),
      "Content-Type": 'application/x-www-form-urlencoded'
    }
  });
};
export const requestToken = (code, history) => {

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
    history.push(getTargetUrl());
    return response.data;
  }).catch(error => {
    if (error) {
      console.log('//TODO: redirect to error page');
      redirectToAuthService();
    }
  });
};

export const redirectToAuthService = () => {
  if (isClient()) {
    window.location.href = process.env.AUTH_SERVER_URL
      + '/uaa/oauth/authorize?client_id=' + CLIENT_ID + '&redirect_uri='
      + process.env.LOGIN_URL + '&response_type=code&scope=resource-read';
  }
};
export const rememberTargetUrl = (url) => {
  getLocalStorage().targetUrl = url.pathname;
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
export const authenticate = (url) => {
  rememberTargetUrl(url);
  redirectToAuthService();
};

export const logout = () => {
  //tODO: location from parameters
  removeTokens();
  if (isClient()) {
    window.location.href = "/";
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

export const removeTokens = () => {
  removeAccessToken();
  removeRefreshToken();
};

export const isAccessTokenExpired = token => isTokenExpired(token);

export const isRefreshTokenExpired = token => isTokenExpired(token);

export const isTokenExpired = token => {
  if (!token) {
    return true;
  }
  if (isClient()) {
    const {exp} = jwtDecode(token);
    // exp in seconds
    // token is expired if lifetime smaller then connection timeout
    return (exp * 1000 - Date.now()) < TIMEOUT;
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
        reject();
      });
    } else if (
      isAccessTokenExpired(access_token) &&
      isRefreshTokenExpired(refresh_token)) {
      console.log("All tokens expired");
      if (isClient()) {
        authenticate({pathname: window.location.pathname});
      }
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