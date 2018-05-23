import {LOAD_SETTINGS, SAVE_SETTINGS} from "../constants/actionTypes";

const settingsReducer = (state = {userSettings: {}}, action) => {
  switch (action.type) {
    case LOAD_SETTINGS:
      return {...state, userSettings: action.userSettings};
    case SAVE_SETTINGS:
      return {...state, userSettings: action.userSettings};
    default:
      return state;
  }
};

export default settingsReducer;
