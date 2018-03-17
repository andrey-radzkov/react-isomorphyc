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
      this.appendMessage(payload);
      new Notification(payload.data.title, payload.data);
    });
  }


// TODO: Add a message to the messages element. Just for test purposes. rewrite to react component
  appendMessage(payload) {
    const messagesElement = document.querySelector('#messages');
    const dataHeaderELement = document.createElement('h5');
    const dataElement = document.createElement('pre');
    dataElement.style = 'overflow-x:hidden;';
    dataHeaderELement.textContent = 'Received message:';
    dataElement.textContent = JSON.stringify(payload, null, 2);
    messagesElement.appendChild(dataHeaderELement);
    messagesElement.appendChild(dataElement);
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

  sendNotificationToAll = () => (dispatch) => {
    dispatch(securedGet(process.env.API_URL + '/resource/send-push-message-to-all/'));
  };

  subscribe = (callback) => {
    this.getMessaging().requestPermission().then(() => {
      callback(true);
    }).catch((err) => {
      callback(null);
    });
  };
}

