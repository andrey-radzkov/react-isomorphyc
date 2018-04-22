import {LOAD_CLOTHES} from "../constants/actionTypes";

const clothesListReducer = (state = {clothes: {}}, action) => {
  switch (action.type) {
    case LOAD_CLOTHES:
      return {clothes: action.clothes};
    default:
      return state;
  }
};

export default clothesListReducer;
