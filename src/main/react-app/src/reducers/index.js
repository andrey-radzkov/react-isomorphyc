import {combineReducers} from "redux";
import ajaxActionsReducer from "./ajaxActionsReducer";
import modalReducer from "./modalReducer";
import {routerReducer} from "react-router-redux";
import {reducer as reduxFormReducer} from "redux-form";
import clothesReducer from "./clothesReducer";
import settingsReducer from "./settingsReducer";

const rootReducer = combineReducers({
  clothesReducer,
  settingsReducer,
  ajaxActionsReducer,
  modalReducer,
  routing: routerReducer,
  form: reduxFormReducer
});

export default rootReducer;
