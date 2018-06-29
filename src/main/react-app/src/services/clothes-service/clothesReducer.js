import {LOAD_TYPES} from "./clothesActionTypes";

const clothesReducer = (state = {clothesTypes: []}, action) => {
  switch (action.type) {
    case LOAD_TYPES:
      return {...state, clothesTypes: action.clothesTypes};

    default:
      return state;
  }
};

export default clothesReducer;
