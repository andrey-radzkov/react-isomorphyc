import {LOAD_CLOTHES_TYPES_WITH_COUNT, LOAD_BASKET} from "../constants/actionTypes";

const clothesReducer = (state = {clothesTypes: [], basket: {}}, action) => {
  switch (action.type) {
    case LOAD_CLOTHES_TYPES_WITH_COUNT:
      return {clothesTypes: action.clothesTypes};
    case LOAD_BASKET:
      return {basket: action.basket};
    default:
      return state;
  }
};

export default clothesReducer;
