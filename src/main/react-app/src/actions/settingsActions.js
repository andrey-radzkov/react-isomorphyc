import {LOAD_SETTINGS} from "../constants/actionTypes";
import {securedGet, securedPost} from "../oauth2/xhr";
import {FULL_PAGE_WAITING_ID, hideWaiting, showWaiting} from "./componentStateActions";

export const loadSettings = () => (dispatch) => {
  dispatch(showWaiting(FULL_PAGE_WAITING_ID));
  dispatch(securedGet(process.env.API_URL + '/resource/get-user-settings/'))
    .then(response => {
      dispatch(hideWaiting(FULL_PAGE_WAITING_ID));
      dispatch({type: LOAD_SETTINGS, userSettings: response.data});
    }).catch(res => console.log("error loading user settings"));
};

export const saveSettings = (settings) => (dispatch) => {
  return dispatch(securedPost(process.env.API_URL + '/resource/save-user-settings/', settings))
    .then(response => {
    }).catch(res => console.log("error saving user settings"));
};
