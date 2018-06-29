import {securedGet, securedPut} from "../oauth2/xhr";

import {FULL_PAGE_WAITING_ID} from "../modal-waiting-service/componentStateActions";
import {LOAD_TYPES} from "./clothesActionTypes";

export const addQuickNote = (values) => (dispatch) => {
  return dispatch(
    securedPut(process.env.API_URL + '/resource/put-clothes-to-basket/',
      {name: values.type.name})).then(res => {
    ///tODO show messgae
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

