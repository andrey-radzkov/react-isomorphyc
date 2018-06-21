import {combineReducers} from "redux";
import ajaxActionsReducer from "./ajaxActionsReducer";
import modalReducer from "./modalReducer";
import {routerReducer} from "react-router-redux";
import {reducer as reduxFormReducer} from "redux-form";
import clothesReducer from "../clothes-service/clothesReducer";
import settingsReducer from "../settings-service/settingsReducer";
import snackbarReducer from "./snackbarReducer";

const rootReducer = combineReducers({
  clothesReducer,
  settingsReducer,
  ajaxActionsReducer,
  modalReducer,
  snackbarReducer,
  routing: routerReducer,
  form: reduxFormReducer
});

export default rootReducer;
