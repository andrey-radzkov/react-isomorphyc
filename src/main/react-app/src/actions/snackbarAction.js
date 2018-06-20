import {HIDE_SNACK, SHOW_SNACK} from "../constants/actionTypes";
//TODO: refactor
let snackbars = [];
let intervalId = null;
export const AUTO_CLOSE_INTERVAL = 3000;
export const ANIMATION_DURATION = 600;

export const showError = (message) => (dispatch) => {
  snackbars.push({message: message, type: "error"});
  if (snackbars.length > 1 && intervalId == null) {
    dispatch(startMessagePooling());
  } else {
    dispatch({type: SHOW_SNACK, snack: snackbars[0]});
  }
};


export const hideSnack = () => (dispatch) => {
  snackbars.shift();
  dispatch({type: HIDE_SNACK});
  if (snackbars.length > 0) {
    setTimeout(() => {
      dispatch({type: SHOW_SNACK, snack: snackbars[0]})
    }, ANIMATION_DURATION);
    dispatch(startMessagePooling());
  }
};

const startMessagePooling = () => (dispatch) => {
  if (intervalId != null) {
    clearInterval(intervalId);
  }
  intervalId = setInterval(() => {
    if (snackbars.length === 0) {
      clearInterval(intervalId);
    } else {
      dispatch({type: SHOW_SNACK, snack: snackbars[0]});
    }
  }, AUTO_CLOSE_INTERVAL + ANIMATION_DURATION);
};
