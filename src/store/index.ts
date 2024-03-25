import {configureStore} from '@reduxjs/toolkit';
import {createAPI} from '../services/api.ts';
import {offersSlice} from './slices/offers.ts';
import {offerSlice} from './slices/offer.ts';
import {userSlice} from './slices/user.ts';
import {reviewsSlice} from './slices/reviews.ts';

export const api = createAPI();

export const store = configureStore({
  reducer: {
    [offersSlice.name]: offersSlice.reducer,
    [offerSlice.name]: offerSlice.reducer,
    [reviewsSlice.name]: reviewsSlice.reducer,
    [userSlice.name]: userSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),//.concat(redirect),
});
