import * as firebase from "firebase/app";
import {securedGet} from "../oauth2/xhr";
import React from "react";

require("firebase/messaging");

export default class FirebaseMessaging extends React.Component {

  constructor() {
    super();
    let config = {
      apiKey: "AIzaSyAxmz11DjcnHcMWkOHhzRxUGx4CR9cyNzg",
      authDomain: "react-test-project-1a086.firebaseapp.com",
      databaseURL: "https://react-test-project-1a086.firebaseio.com",
      projectId: "react-test-project-1a086",
      storageBucket: "",
      messagingSenderId: "966501688821"
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }
    this.messaging = firebase.messaging();
    this.messaging.onMessage(payload => {
      new Notification(payload.data.title, payload.data);
    });
  }
  
  getMessaging = () => {
    return this.messaging;
  };

  sendNotification = () => (dispatch) => {
    //TODO: on token refresh, get token on subscribe, store on backend
    this.getMessaging().getToken().then(token => {
      dispatch(securedGet(process.env.API_URL + '/resource/send-push-message/' + token));
    });
  };

  subscribe = (callback) => {
    this.getMessaging().requestPermission().then(() => {
      callback(true);
    }).catch((err) => {
      callback(null);
    });
  };
}

