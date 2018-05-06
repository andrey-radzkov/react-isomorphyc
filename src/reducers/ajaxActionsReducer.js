import {HIDE_WAITING, SHOW_WAITING} from "../constants/actionTypes";


const ajaxActionsReducer = (state = {}, action) => {
  switch (action.type) {
    case SHOW_WAITING:
      return {
        ...state,
        [action.waitingId]: true
      };
    case
    HIDE_WAITING:
      return {
        ...state,
        [action.waitingId]: false
      };
    default:
      return state;
  }
};

export default ajaxActionsReducer;
