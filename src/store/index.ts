import {configureStore} from '@reduxjs/toolkit';
import {offersSlice} from './slices/offers.ts';
import {createAPI} from '../services/api.ts';
import {authorizationSlice} from './slices/auth.ts';

export const api = createAPI();

export const store = configureStore({
  reducer: {
    [offersSlice.name]: offersSlice.reducer,
    [authorizationSlice.name]: authorizationSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),//.concat(redirect),
});
