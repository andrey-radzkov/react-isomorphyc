import * as firebase from "firebase/app";
import React from "react";
import {isClient} from "../../utils/ssr-util";
import {securedPut} from "../oauth2/xhr";

require("firebase/messaging");

export default class FirebaseMessaging extends React.Component {

  constructor() {
    super();
    if (isClient()) {
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
      this.getMessaging().getToken().then(token => this.currentToken = token);
    }
  }

  getMessaging = () => {
    return this.messaging;
  };

  subscribe = () => (dispatch) => {
    //TODO: on token refresh, get token on subscribe, store on backend
    this.getMessaging().requestPermission().then(() => {
      this.getMessaging().getToken().then(token => {
        if (token && !this.currentToken) {
          this.currentToken = token;
          console.log(token);
          dispatch(securedPut(process.env.API_URL + '/resource/subscribe/', {token: token}));
        }
      }).catch((err) => {
        // TODO: alert
      });
      this.getMessaging().onTokenRefresh().then(token => {
        alert("token refreshed " + token);
      });
    }).catch((err) => {
      // TODO: dialog that subscription is necessary
    });
  };
}

