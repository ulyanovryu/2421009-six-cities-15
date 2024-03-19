import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app.tsx';

import {Provider} from 'react-redux';
import {store} from './store';

import Settings from './components/settings/settings.tsx';

import citiesList from './mocks/cities.ts';
import offersList from './mocks/offers.ts';
import sortingsList from './mocks/sortings.ts';
import reviewsListData from './mocks/reviews.ts';
import ratingsList from './mocks/rating.ts';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App
        offersCount={Settings.OffersCount}
        offersList={offersList}
        citiesList={citiesList}
        sortingsList={sortingsList}
        reviewsListData={reviewsListData}
        ratingsList={ratingsList}
      />
    </Provider>
  </React.StrictMode>
);
