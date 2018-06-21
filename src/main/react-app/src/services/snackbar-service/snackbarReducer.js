import {HIDE_SNACK, SHOW_SNACK} from "./snackbarActionTypes";

const initialState = {
  snack: {visible: false}
};

const snackbarReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_SNACK:
      return {...state, snack: {...action.snack, visible: true}};
    case HIDE_SNACK:
      return {...state, snack: {...state.snack, visible: false}};
    default:
      return state;
  }
};

export default snackbarReducer;
