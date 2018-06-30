import {LOAD_FRIENDS, SELECT_RECEIVER,} from "./settingsActionTypes";
import axios from "axios";


export const loadFriends = () => (dispatch) => {
  //tODO: api to constant
  axios.get('/vk-api/method/friends.get', {
    params: {
      access_token: localStorage.getItem("vk_token"),
      version: process.env.VK_API_VERSION,
      order: "mobile",
      offset: "0",
      fields: "photo_50",
    }
  }).then(response => {
    dispatch({type: LOAD_FRIENDS, friends: response.data.response});
  });
};


