import {LOAD_BASKET, LOAD_CLOTHES_TYPES_WITH_COUNT} from "./clothesActionTypes";

const clothesReducer = (state = {clothesTypes: [], basket: {}}, action) => {
  switch (action.type) {
    case LOAD_CLOTHES_TYPES_WITH_COUNT:
      return {...state, clothesTypes: action.clothesTypes};
    case LOAD_BASKET:
      return {...state, basket: action.basket};
    default:
      return state;
  }
};

export default clothesReducer;
