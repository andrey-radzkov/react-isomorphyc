importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');
//tODO: import from local

firebase.initializeApp({
  'messagingSenderId': '966501688821'
});
const messaging = firebase.messaging();


messaging.setBackgroundMessageHandler(function (payload) {

  payload.data.image = payload.data.icon;
  console.log("data", payload.data);
  payload.data.actions = [
    {
      //TODO: investigate 2 slash url
      action: 'http://localhost:3000/push',
      title: 'Coffee',
      icon: 'https://cdn.cnn.com/cnnnext/dam/assets/150929101049-black-coffee-stock-exlarge-169.jpg'
    },
    {
      action: 'http://localhost:3000/infinite-scroll/',
      title: 'Doughnut',
      icon: 'https://cdn.shopify.com/s/files/1/0101/2792/files/Doughnuts_2_large.jpg?v=1484072104'
    },

  ];
  return self.registration.showNotification(payload.data.title,
    payload.data);
});

self.addEventListener("notificationclick", function (event) {
  console.log("event", event);
  event.stopImmediatePropagation();
  clients.openWindow(event.action || "http://localhost:3000/redux-form/");//TODO: from data
  event.notification.close();
});


