import {LOAD_SETTINGS} from "../constants/actionTypes";
import {securedGet, securedPost} from "../oauth2/xhr";
export const loadSettings = () => (dispatch) => {
  //dispatch(showWaiting(CLOTHES_TYPES_WAITING_ID));
  return dispatch(securedGet(process.env.API_URL + '/resource/get-user-settings/'))
    .then(response => {
      //  dispatch(hideWaiting(CLOTHES_TYPES_WAITING_ID));
      return dispatch({type: LOAD_SETTINGS, userSettings: response.data});
    }).catch(res => console.log("error loading user settings"));
};

export const saveSettings = (settings) => (dispatch) => {
  return dispatch(securedPost(process.env.API_URL + '/resource/save-user-settings/', settings))
    .then(response => {
    }).catch(res => console.log("error saving user settings"));
};
