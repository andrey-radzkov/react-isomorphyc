import {SHOW_SNACK} from "../constants/actionTypes";

export const showError = (message) => (dispatch) => {
  dispatch({type: SHOW_SNACK, snack: {message: message}});
};
