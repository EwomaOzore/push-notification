import logo from './logo.svg';
import './App.css';
import { useState } from 'react'
import { fetchToken, onMessageListener } from './firebase';
import { Button, Toast } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({ title: '', body: '' });
  const [notificationTime, setNotificationTime] = useState(null);
  const [isTokenFound, setTokenFound] = useState(false);
  fetchToken(setTokenFound);

  onMessageListener().then(payload => {
    setNotification({
      body: payload.notification.body,
      image: payload.notification.image,
      title: payload.notification.title,
      ctaLink: payload.data.ctaLink,
      ctaTitle: payload.data.ctaTitle
    });
    setNotificationTime(new Date());
    setShow(true);
    console.log(payload);
  }).catch(err => console.log('failed: ', err));

  setInterval(() => {
    setNotificationTime(new Date());
  }, 60000);

  const onShowNotificationClicked = () => {
    setNotification({ title: "Notification", body: "This is a test notification" })
    setShow(true);
  }

  return (
    <div className="App">
      <Toast onClose={() => setShow(false)} show={show} delay={3000} animation style={{
        position: 'absolute',
        top: 20,
        right: 20,
        minWidth: 200,
        backgroundColor: 'antiquewhite'
      }}>
        <Toast.Header className='toastHeader'>
          <strong className="mr-auto">{notification.title}</strong>
          <div>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded mr-2"
              alt=""
            />
            <small>{notificationTime && formatTimeAgo(notificationTime)}</small>
          </div>
        </Toast.Header>
        <Toast.Body>
          <p className='toastText'>{notification.body}</p>
          <img src={notification.image} className='toastImage' alt='' />
          <a href={notification.ctaLink} className='ctaLink'>{notification.ctaTitle}</a>
        </Toast.Body>

      </Toast>
      <header className="App-header">
        {isTokenFound && <h1> Notification permission enabled 👍🏻 </h1>}
        {!isTokenFound && <h1> Need notification permission ❗️ </h1>}
        <img src={logo} className="App-logo" alt="logo" />
        <Button onClick={() => onShowNotificationClicked()}>Show Toast</Button>
      </header>

    </div>
  );
}

function formatTimeAgo(time) {
  const now = new Date();
  const diff = Math.floor((now - time) / 60000);
  if (diff < 1) {
    return 'just now';
  } else if (diff === 1) {
    return '1 minute ago';
  } else {
    return `${diff} minutes ago`;
  }
}

export default App;