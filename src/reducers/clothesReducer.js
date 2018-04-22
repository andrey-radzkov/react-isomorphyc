import {LOAD_BASKET, LOAD_CLOTHES} from "../constants/actionTypes";

const clothesReducer = (state = {clothes: [], basket: {}}, action) => {
  switch (action.type) {
    case LOAD_CLOTHES:
      return {clothes: action.clothes};
    case LOAD_BASKET:
      return {basket: action.basket};
    default:
      return state;
  }
};

export default clothesReducer;
