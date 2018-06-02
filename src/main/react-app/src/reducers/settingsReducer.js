import {LOAD_FRIENDS, LOAD_SETTINGS, SAVE_SETTINGS, SELECT_RECEIVER} from "../constants/actionTypes";
const initialState = {userSettings: {}, friends: [], receiver: null, senders: []};

const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SETTINGS:
      return {...state, userSettings: action.userSettings};
    case SAVE_SETTINGS:
      return {...state, userSettings: action.userSettings};
    case LOAD_FRIENDS:
      return {...state, friends: action.friends};
    case SELECT_RECEIVER:
      return {...state, receiver: action.receiver};
    default:
      return state;
  }
};

export default settingsReducer;
