import {SHOW_SNACK} from "../constants/actionTypes";

const initialState = {
  snacks: []
};

const snackbarReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_SNACK:

      return {...state, snacks: [...state.snacks, action.snack]};
    default:
      return state;
  }
};

export default snackbarReducer;
