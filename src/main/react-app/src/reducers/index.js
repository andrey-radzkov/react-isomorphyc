import {combineReducers} from "redux";
import ajaxActionsReducer from "../services/modal-waiting-service/ajaxActionsReducer";
import modalReducer from "../services/modal-waiting-service/modalReducer";
import {routerReducer} from "react-router-redux";
import {reducer as reduxFormReducer} from "redux-form";
import clothesReducer from "../services/clothes-service/clothesReducer";
import settingsReducer from "../services/settings-service/settingsReducer";
import snackbarReducer from "../services/snackbar-service/snackbarReducer";

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
