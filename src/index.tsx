import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app.tsx';

import {Provider} from 'react-redux';
import './polyfills';
import {store} from './store';

//import Settings from './components/settings/settings.tsx';
import {CITIES} from './const.ts';
import offersList from './mocks/offers.ts';
import reviewsListData from './mocks/reviews.ts';
import ratingsList from './mocks/rating.ts';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App
        offersList={offersList}
        citiesList={CITIES}
        reviewsListData={reviewsListData}
        ratingsList={ratingsList}
      />
    </Provider>
  </React.StrictMode>
);
