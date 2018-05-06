import {CLOSE_MODAL, OPEN_MODAL} from "../constants/actionTypes";

const modalReducer = (state = {}, action) => {
  switch (action.type) {
    case OPEN_MODAL:
      return {
        ...state,
        [action.modalId]: true
      };
    case
    CLOSE_MODAL:
      return {
        ...state,
        [action.modalId]: false
      };
    default:
      return state;
  }
};

export default modalReducer;
