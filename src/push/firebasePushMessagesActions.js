import * as firebase from "firebase/app";
import {securedGet} from "../oauth2/xhr";
require("firebase/messaging");

let config = {
  apiKey: "AIzaSyAxmz11DjcnHcMWkOHhzRxUGx4CR9cyNzg",
  authDomain: "react-test-project-1a086.firebaseapp.com",
  databaseURL: "https://react-test-project-1a086.firebaseio.com",
  projectId: "react-test-project-1a086",
  storageBucket: "",
  messagingSenderId: "966501688821"
};
firebase.initializeApp(config);

export const messaging = firebase.messaging();
messaging.onMessage(function (payload) {
  //TODO: motification too
  appendMessage(payload);
  new Notification(payload.notification.title, payload.notification);
});
// TODO: Add a message to the messages element. Just for test purposes. rewrite to react component
function appendMessage(payload) {
  const messagesElement = document.querySelector('#messages');
  const dataHeaderELement = document.createElement('h5');
  const dataElement = document.createElement('pre');
  dataElement.style = 'overflow-x:hidden;';
  dataHeaderELement.textContent = 'Received message:';
  dataElement.textContent = JSON.stringify(payload, null, 2);
  messagesElement.appendChild(dataHeaderELement);
  messagesElement.appendChild(dataElement);
}

export const sendNotification = () => {
  //TODO: on token refresh
  messaging.getToken().then(token => {
    securedGet(process.env.API_URL + '/resource/sendPushMessage/' + token);
  });
};


export const subscribe = (callback) => {
  messaging.requestPermission().then(() => {
    callback(true);
  }).catch((err) => {
    callback(null);
  });
};

