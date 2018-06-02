import {LOAD_FRIENDS, LOAD_SETTINGS, SELECT_RECEIVER} from "../constants/actionTypes";
import {securedGet, securedPost} from "../oauth2/xhr";
import {FULL_PAGE_WAITING_ID, hideWaiting, showWaiting} from "./componentStateActions";
import axios from "axios";

export const loadSettings = () => (dispatch) => {
  dispatch(showWaiting(FULL_PAGE_WAITING_ID));
  dispatch(securedGet(process.env.API_URL + '/resource/get-user-settings/'))
    .then(response => {
      dispatch(hideWaiting(FULL_PAGE_WAITING_ID));
      dispatch({type: LOAD_SETTINGS, userSettings: response.data});
    }).catch(res => console.log("error loading user settings"));
};

export const loadFriends = () => (dispatch) => {
  //tODO: api to constant
  axios.get('/vk-api/method/friends.get', {
    params: {
      access_token: localStorage.getItem("vk_token"),
      version: process.env.VK_API_VERSION,
      order: "mobile",
      offset: "0",
      fields: "photo_50",
    }
  }).then(response => {
    dispatch({type: LOAD_FRIENDS, friends: response.data.response});
  });
};

export const selectReceiver = (id) => (dispatch) => {
  dispatch({type: SELECT_RECEIVER, receiver: id});
};

export const saveSettings = (settings) => (dispatch) => {
  return dispatch(securedPost(process.env.API_URL + '/resource/save-user-settings/', settings))
    .then(response => {
    }).catch(res => console.log("error saving user settings"));
};
