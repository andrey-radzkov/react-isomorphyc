import {combineReducers} from "redux";
import supplierReducer from "./supplierReducer";
import ajaxActionsReducer from "./ajaxActionsReducer";
import supplierListReducer from "./supplierListReducer";
import modalReducer from "./modalReducer";
import {routerReducer} from "react-router-redux";
import {reducer as reduxFormReducer} from "redux-form";
import clothesListReducer from "./clothesListReducer";

const rootReducer = combineReducers({
  supplierReducer,
  supplierListReducer,
  clothesListReducer,
  ajaxActionsReducer,
  modalReducer,
  routing: routerReducer,
  form: reduxFormReducer
});

export default rootReducer;
