import {
  LOAD_FRIENDS,
  LOAD_SETTINGS,
  REVERT_RECEIVER,
  REVERT_SENDERS,
  SAVE_RECEIVER,
  SAVE_SENDERS,
  SAVE_SETTINGS,
  SELECT_RECEIVER,
  SELECT_SENDERS
} from "./settingsActionTypes";

const initialState = {
  userSettings: {},
  friends: [],
  receiver: null,
  initialReceiver: null,
  senders: [],
  initialSenders: [],
};

const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SETTINGS:
      return {...state, userSettings: action.userSettings};
    case SAVE_SETTINGS:
      return {...state, userSettings: action.userSettings};

    case LOAD_FRIENDS:
      return {...state, friends: action.friends};

    case SAVE_RECEIVER:
      return {...state, initialReceiver: action.receiver};
    case SELECT_RECEIVER:
      return {...state, receiver: action.receiver};
    case REVERT_RECEIVER:
      return {...state, receiver: state.initialReceiver};

    case SELECT_SENDERS:
      return {...state, senders: action.senders};
    case SAVE_SENDERS:
      return {...state, initialSenders: action.senders};
    case REVERT_SENDERS:
      return {...state, senders: state.initialSenders};

    default:
      return state;
  }
};

export default settingsReducer;
