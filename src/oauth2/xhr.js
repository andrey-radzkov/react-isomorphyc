import {TIMEOUT} from "./Oauth";
import {HIDE_WAITING, SHOW_WAITING} from "../constants/actionTypes";
import {
  getAccessToken,
  validateAndUpdateTokenIfNecessary
} from "./TokenService";
import axios from "axios";

export const securedGet = (url, dispatch, waitingLayerId) => {
  return request(url,
    {method: "GET", dispatch: dispatch, waitingLayerId: waitingLayerId});
};
export const securedPost = (url, data, dispatch, waitingLayerId) => {
  return request(url,
    {method: "POST", data, dispatch: dispatch, waitingLayerId: waitingLayerId});
};

const request = (url, config) => {
  //TODO: create growls
  if (config.waitingLayerId) {
    config.dispatch({type: SHOW_WAITING, waitingId: config.waitingLayerId});
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
          config.dispatch(
            {type: HIDE_WAITING, waitingId: config.waitingLayerId});
        }
        return response;
      }).catch(error => {
        config.dispatch(
          {type: HIDE_WAITING, waitingId: config.waitingLayerId});
        console.debug("server.request.error", error);
      });
  });
};
