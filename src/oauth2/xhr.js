import {TIMEOUT} from "./Oauth";
import {getAccessToken, validateAndUpdateTokenIfNecessary} from "./TokenService";
import axios from "axios";

export const securedGet = (url) => {
  return request(url, {method: "GET"});
};
export const securedPost = (url, data) => {
  return request(url, {method: "POST", data});
};

const request = (url, config) => {
  //TODO: use interceptors, create growls

  return validateAndUpdateTokenIfNecessary().then(() => {
    let request = axios.create({
      timeout: TIMEOUT,
      headers: {...config.headers, "Authorization": 'Bearer ' + getAccessToken()}
    });
    return request(url, config)
      .then(response => {
        return response;
      }).catch(error => {
        console.debug("server.request.error", error);
      });
  });
};
