import {LOAD_All_CLOTHES, LOAD_BASKET, LOAD_CLEAN_CLOTHES} from "../constants/actionTypes";

const clothesReducer = (state = {clothes: [], cleanClothes: [], basket: {}}, action) => {
  switch (action.type) {
    case LOAD_All_CLOTHES:
      return {clothes: action.clothes};
    case LOAD_CLEAN_CLOTHES:
      return {cleanClothes: action.cleanClothes};
    case LOAD_BASKET:
      return {basket: action.basket};
    default:
      return state;
  }
};

export default clothesReducer;
