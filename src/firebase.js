import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from "firebase/messaging";

var firebaseConfig = {
    apiKey: "AIzaSyCpdkfyYzNjyAyrDkYpyyKMQpwF8XWjfgY",
    authDomain: "push-notification-4cf1d.firebaseapp.com",
    projectId: "push-notification-4cf1d",
    storageBucket: "push-notification-4cf1d.appspot.com",
    messagingSenderId: "112705951456",
    appId: "1:112705951456:web:9bd87ca3d06c02eedca285",
    measurementId: "G-KW8760KBWY"
};

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

export const fetchToken = (setTokenFound) => {
    return getToken(messaging, { vapidKey: 'BNpPLjx2kvfNYSBtqGG9JP5c9EV4H-JmEzyX77PE-YwJwXo1QFWPh0dVHnAYTNK38vnjC-AtUQoV316XMw9j-Mo' }).then((currentToken) => {
        if (currentToken) {
            console.log('current token for client: ', currentToken);
            setTokenFound(true);
            // Track the token -> client mapping, by sending to backend server
            // show on the UI that permission is secured
        } else {
            console.log('No registration token available. Request permission to generate one.');
            setTokenFound(false);
            // shows on the UI that permission is required 
        }
    }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
        // catch error while creating client token
    });
}

export const onMessageListener = () =>
    new Promise((resolve) => {
        onMessage(messaging, (payload) => {
            resolve(payload);
        });
    });