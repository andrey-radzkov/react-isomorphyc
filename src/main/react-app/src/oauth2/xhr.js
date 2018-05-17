import {TIMEOUT} from "./Oauth";
import {getAccessToken, validateAndUpdateTokenIfNecessary} from "./TokenService";
import axios from "axios";
import {hideWaiting, showWaiting} from "../actions/componentStateActions";

export const securedGet = (url, waitingLayerId) => (dispatch) => {
  return dispatch(request(url,
    {method: "GET", waitingLayerId: waitingLayerId}));
};
export const securedPost = (url, data, waitingLayerId) => (dispatch) => {
  return dispatch(
    request(url, {method: "POST", data, waitingLayerId: waitingLayerId}));
};
export const securedPut = (url, data, waitingLayerId) => (dispatch) => {
  return dispatch(
    request(url, {method: "PUT", data, waitingLayerId: waitingLayerId}));
};
export const securedDelete = (url, data, waitingLayerId) => (dispatch) => {
  return dispatch(
    request(url, {method: "DELETE", data, waitingLayerId: waitingLayerId}));
};

const request = (url, config) => (dispatch) => {
  //TODO: create growls
  if (config.waitingLayerId) {
    dispatch(showWaiting(config.waitingLayerId));
  }
  return validateAndUpdateTokenIfNecessary().then(() => {
    let request = axios.create({
      timeout: TIMEOUT,
      headers: {
        ...config.headers,
        "Authorization": 'Bearer ' + getAccessToken()
      }
    });
    return request(url, config).then(response => {
      dispatch(hideWaitingIfEnabled(config.waitingLayerId));
      return response;
    }).catch(error => {
      dispatch(hideWaitingIfEnabled(config.waitingLayerId));
      console.debug("server.request.error", error);
    });
  }).catch((params) => {
    console.log("please, log in", params);
  });
};

const hideWaitingIfEnabled = (waitingLayerId) => (dispatch) => {
  if (waitingLayerId) {
    dispatch(hideWaiting(waitingLayerId));
  }
};
