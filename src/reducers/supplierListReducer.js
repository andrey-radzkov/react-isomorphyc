import {LOAD_SUPPLIERS} from "../constants/actionTypes";


const supplierListReducer = (state = {suppliers: {}}, action) => {
  switch (action.type) {
    case LOAD_SUPPLIERS:
      return {suppliers: action.suppliers};
    default:
      return state;
  }
};

export default supplierListReducer;
