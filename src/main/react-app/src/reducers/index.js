import combineReducers from "redux/lib/combineReducers";
import ajaxActionsReducer from "../services/modal-waiting-service/ajaxActionsReducer";
import modalReducer from "../services/modal-waiting-service/modalReducer";
//TODO: try to change this import
import {routerReducer} from "react-router-redux";
import reduxFormReducer from "redux-form/lib/reducer";
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
