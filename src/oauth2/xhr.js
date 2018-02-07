import {TIMEOUT} from "./Oauth";
import {HIDE_WAITING, SHOW_WAITING} from "../constants/actionTypes";
import {
  getAccessToken,
  validateAndUpdateTokenIfNecessary
} from "./TokenService";
import axios from "axios";

export const securedGet = (url, waitingLayerId) => (dispatch) => {
  return dispatch(request(url,
    {method: "GET", waitingLayerId: waitingLayerId}));
};
export const securedPost = (url, data, waitingLayerId) => (dispatch) => {
  return dispatch(
    request(url, {method: "POST", data, waitingLayerId: waitingLayerId}));
};

const request = (url, config) => (dispatch) => {
  //TODO: create growls
  if (config.waitingLayerId) {
    dispatch({type: SHOW_WAITING, waitingId: config.waitingLayerId});
  }
  return validateAndUpdateTokenIfNecessary().then(() => {
    let request = axios.create({
      timeout: TIMEOUT,
      headers: {
        ...config.headers,
        "Authorization": 'Bearer ' + getAccessToken()
      }
    });
    return request(url, config)
      .then(response => {
        if (config.waitingLayerId) {
          dispatch({type: HIDE_WAITING, waitingId: config.waitingLayerId});
        }
        return response;
      }).catch(error => {
        dispatch({type: HIDE_WAITING, waitingId: config.waitingLayerId});
        console.debug("server.request.error", error);
      });
  });
};
