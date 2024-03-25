import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/';

import {Provider} from 'react-redux';
import './polyfills';
import {store} from './store';

import {CITIES} from './const.ts';
import offersList from './mocks/offers.ts';
import ratingsList from './mocks/rating.ts';
import {ToastContainer} from 'react-toastify';
import {checkAuthAction} from './store/thunks/auth.ts';

// store.dispatch(fetchOffersAction());
store.dispatch(checkAuthAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <App
        offersList={offersList}
        citiesList={CITIES}
        ratingsList={ratingsList}
      />
    </Provider>
  </React.StrictMode>
);
