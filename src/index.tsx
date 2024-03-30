import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/';

import {Provider} from 'react-redux';
import './polyfills';
import {store} from './store';

import ratingsList from './mocks/rating.ts';
import {ToastContainer} from 'react-toastify';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <App
        ratingsList={ratingsList}
      />
    </Provider>
  </React.StrictMode>
);
