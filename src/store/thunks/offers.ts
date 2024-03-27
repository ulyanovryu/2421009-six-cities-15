import {OfferDetail, Offers} from '../../types/offers.ts';

import {APIRoute} from '../../const';
import {createAppAsyncThunk} from '../../hooks';
import {AppDispatch, State} from '../../types/state.ts';
import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';


export const fetchOffersAction = createAsyncThunk<Offers, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Offers>(APIRoute.Offers);
    return data;
  },
);

export const fetchOfferAction = createAppAsyncThunk<OfferDetail, string>(
  'data/fetchOffer',
  async (offerId, {extra: api}) => {
    const {data} = await api.get<OfferDetail>(`${APIRoute.Offers}/${offerId}`);
    return data;
  },
);

export const fetchNearByAction = createAppAsyncThunk<Offers, string>(
  'data/fetchNearBy',
  async (offerId, {extra: api}) => {
    const {data} = await api.get<Offers>(`${APIRoute.Offers}/${offerId}/nearby`);
    return data;
  },
);
