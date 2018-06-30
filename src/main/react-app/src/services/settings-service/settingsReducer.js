import {LOAD_FRIENDS, SELECT_RECEIVER,} from "./settingsActionTypes";

const initialState = {
  friends: [],
  receiver: null,
  initialReceiver: null,
};

const settingsReducer = (state = initialState, action) => {
  switch (action.type) {

    case LOAD_FRIENDS:
      return {...state, friends: action.friends};

    case SELECT_RECEIVER:
      return {...state, receiver: action.receiver};
    default:
      return state;
  }
};

export default settingsReducer;
