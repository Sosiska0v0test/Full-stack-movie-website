import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "aos";
import "aos/dist/aos.css"
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './Redux/store';

import { GoogleOAuthProvider } from '@react-oauth/google'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={ store } >
      <BrowserRouter />
      <GoogleOAuthProvider clientId="824302536134-ouhah1h86hpmqapui110ks9unm2dovgk.apps.googleusercontent.com">
        <App />
      </GoogleOAuthProvider>
      <BrowserRouter />
    </Provider>
  </React.StrictMode >
);
