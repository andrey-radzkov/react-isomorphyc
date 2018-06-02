import {LOAD_FRIENDS, LOAD_SETTINGS, SELECT_RECEIVER, SELECT_SENDERS} from "../constants/actionTypes";
import {securedGet, securedPost} from "../oauth2/xhr";
import {FULL_PAGE_WAITING_ID, hideWaiting, showWaiting} from "./componentStateActions";
import axios from "axios";
import remove from "lodash/remove";
export const loadSettings = () => (dispatch) => {
  dispatch(showWaiting(FULL_PAGE_WAITING_ID));
  dispatch(securedGet(process.env.API_URL + '/resource/get-user-settings/'))
    .then(response => {
      dispatch(hideWaiting(FULL_PAGE_WAITING_ID));
      const settings = response.data;
      dispatch({type: LOAD_SETTINGS, userSettings: {id: settings.id, type: settings.sender ? 'sender' : 'receiver'}});
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
export const selectSenders = (selectionId, alreadySelected) => (dispatch) => {
  let newSelection = alreadySelected.slice();
  if (alreadySelected.indexOf(selectionId) >= 0) {
    remove(newSelection, (item) => item === selectionId);
  } else {
    newSelection.push(selectionId);
  }
  dispatch({type: SELECT_SENDERS, senders: newSelection});
};

export const saveSettings = (settings) => (dispatch) => {
  let settingsToSave = {id: settings.id, receiver: settings.type === 'receiver', sender: settings.type === 'sender'};
  return dispatch(securedPost(process.env.API_URL + '/resource/save-user-settings/', settingsToSave))
    .then(response => {
    }).catch(res => console.log("error saving user settings"));
};
