import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../../types/state.ts';
import {Offers} from '../../types/offers.ts';
// import {requireAuthorization, redirectToRoute} from './action';
import {saveToken, dropToken} from '../../services/token';
import {APIRoute, AuthorizationStatus,} from '../../const';
// import {APIRoute, AuthorizationStatus, AppRoute} from '../../const';
import {Auth} from '../../types/auth.ts';
import {User} from '../../types/user.ts';

import {offersActions} from '../../store/slices/offers.ts';
import {authorizationActions} from '../../store/slices/auth.ts';


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

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<User>(APIRoute.Login);
      dispatch(authorizationActions.setAuthorizationStatus(AuthorizationStatus.Auth));
      dispatch(authorizationActions.setUser(data));
    } catch {
      dispatch(authorizationActions.setAuthorizationStatus(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk<void, Auth, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    try {
      const {data} = await api.post<User>(APIRoute.Login, {email, password});
      const {token} = data;
      if (token !== undefined && token !== null) {
        saveToken(token);
        dispatch(authorizationActions.setAuthorizationStatus(AuthorizationStatus.Auth));
        dispatch(authorizationActions.setUser(data));
      } else {
        dispatch(authorizationActions.setAuthorizationStatus(AuthorizationStatus.NoAuth));
      }
    } catch {
      dispatch(authorizationActions.setAuthorizationStatus(AuthorizationStatus.NoAuth));
    }
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(authorizationActions.setAuthorizationStatus(AuthorizationStatus.NoAuth));
  },
);

