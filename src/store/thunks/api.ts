import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../../types/state.ts';
import {Offers} from '../../types/offers.ts';
// import {requireAuthorization, redirectToRoute} from './action';
// import {saveToken, dropToken} from '../../services/token';
import {APIRoute,} from '../../const';
// import {APIRoute, AuthorizationStatus, AppRoute} from '../../const';
// import {AuthData} from '../types/auth-data';
// import {UserData} from '../types/user-data';

import {offersActions} from '../../store/slices/offers.ts';


export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(offersActions.setOffersDataLoading(true));
    const {data} = await api.get<Offers>(APIRoute.Offers);
    dispatch(offersActions.setOffersDataLoading(false));
    dispatch(offersActions.setOffers(data));
  },
);
//
// export const checkAuthAction = createAsyncThunk<void, undefined, {
//   dispatch: AppDispatch;
//   state: State;
//   extra: AxiosInstance;
// }>(
//   'user/checkAuth',
//   async (_arg, {dispatch, extra: api}) => {
//     try {
//       await api.get(APIRoute.Login);
//       dispatch(requireAuthorization(AuthorizationStatus.Auth));
//     } catch {
//       dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
//     }
//   },
// );
//
// export const loginAction = createAsyncThunk<void, AuthData, {
//   dispatch: AppDispatch;
//   state: State;
//   extra: AxiosInstance;
// }>(
//   'user/login',
//   async ({login: email, password}, {dispatch, extra: api}) => {
//     const {data: {token}} = await api.post<UserData>(APIRoute.Login, {email, password});
//     saveToken(token);
//     dispatch(requireAuthorization(AuthorizationStatus.Auth));
//     dispatch(redirectToRoute(AppRoute.Result));
//   },
// );
//
// export const logoutAction = createAsyncThunk<void, undefined, {
//   dispatch: AppDispatch;
//   state: State;
//   extra: AxiosInstance;
// }>(
//   'user/logout',
//   async (_arg, {dispatch, extra: api}) => {
//     await api.delete(APIRoute.Logout);
//     dropToken();
//     dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
//   },
// );
//
