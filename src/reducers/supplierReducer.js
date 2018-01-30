import {LOAD_SUPPLIER} from "../constants/actionTypes";


const supplierReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_SUPPLIER:
      return {
        data: action.data
      };
    default:
      return state;
  }
};

export default supplierReducer;
