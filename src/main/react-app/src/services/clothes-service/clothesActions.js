import {securedGet, securedPut} from "../oauth2/xhr";

import {FULL_PAGE_WAITING_ID} from "../modal-waiting-service/componentStateActions";
import {LOAD_TYPES} from "./clothesActionTypes";
import {showSuccess} from "../snackbar-service/snackbarAction";

export const addQuickNote = (type, receiver) => (dispatch) => {
  return dispatch(
    securedPut(process.env.API_URL + '/resource/add-notification/',
      {type: type.name, receiver: receiver})).then(res => {
    //TODO: localization
    dispatch(showSuccess("Мы уведомим!"));
  });
};

export const loadNoteTypes = () => (dispatch) => {
  return dispatch(
    securedGet(process.env.API_URL + '/resource/all-types/',
      FULL_PAGE_WAITING_ID))
    .then(response => {
      return dispatch(
        {type: LOAD_TYPES, clothesTypes: response.data});
    });
};

