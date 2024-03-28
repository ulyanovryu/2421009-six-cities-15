import {configureStore} from '@reduxjs/toolkit';
import {createAPI} from '../services/api.ts';
import {StoreSlices} from '../const.ts';

import {offersSlice} from './slices/offers.ts';
import {offerSlice} from './slices/offer.ts';
import {favoritesSlice} from './slices/favorites.ts';
import {userSlice} from './slices/user.ts';
import {reviewsSlice} from './slices/reviews.ts';

export const api = createAPI();

export const store = configureStore({
  reducer: {
    [StoreSlices.Offers]: offersSlice.reducer,
    [StoreSlices.Offer]: offerSlice.reducer,
    [StoreSlices.Reviews]: reviewsSlice.reducer,
    [StoreSlices.Favorites]: favoritesSlice.reducer,
    [StoreSlices.User]: userSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),//.concat(redirect),
});
