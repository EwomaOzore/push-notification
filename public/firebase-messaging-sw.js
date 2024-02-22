// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
    apiKey: "AIzaSyCpdkfyYzNjyAyrDkYpyyKMQpwF8XWjfgY",
    authDomain: "push-notification-4cf1d.firebaseapp.com",
    projectId: "push-notification-4cf1d",
    storageBucket: "push-notification-4cf1d.appspot.com",
    messagingSenderId: "112705951456",
    appId: "1:112705951456:web:9bd87ca3d06c02eedca285",
    measurementId: "G-KW8760KBWY"
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
    console.log('Received background message ', payload);

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: './favicon.png'
    };

    self.registration.showNotification(notificationTitle,
        notificationOptions);
});