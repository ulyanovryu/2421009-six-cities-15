import {createSlice} from '@reduxjs/toolkit';
import {RequestStatus, StoreSlices} from '../../const.ts';
import {OfferDetail, Offers} from '../../types/offers.ts';
import {fetchNearByAction, fetchOfferAction} from '../thunks/offers.ts';

interface OfferState {
  offer: OfferDetail | null;
  nearby: Offers;
  status: RequestStatus;
}

const initialState: OfferState = {
  offer: null,
  nearby: [],
  status: RequestStatus.Idle,
};

const offerSlice = createSlice({
  initialState,
  name: StoreSlices.Offer,
  extraReducers(builder) {
    builder
      .addCase(fetchOfferAction.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(fetchOfferAction.fulfilled, (state, action) => {
        state.status = RequestStatus.Success;
        state.offer = action.payload;
      })
      .addCase(fetchOfferAction.rejected, (state) => {
        state.status = RequestStatus.Failed;
      })
      .addCase(fetchNearByAction.fulfilled, (state, action) => {
        state.nearby = action.payload;
      });
  },
  reducers: {
    clear(state) {
      state.offer = null;
      state.nearby = [];
    }
  },
  selectors: {
    offer: (state:OfferState) => state.offer,
    nearby: (state:OfferState) => state.nearby,
    status: (state:OfferState) => state.status,
  }
});

const offerActions = {...offerSlice.actions, fetchOfferAction, fetchNearByAction};
const offerSelectors = {
  ...offerSlice.selectors,
};

export {offerActions, offerSelectors, offerSlice};
