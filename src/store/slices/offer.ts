import {createSlice} from '@reduxjs/toolkit';

import {OfferDetail, Offers} from '../../types/offers.ts';
import {fetchNearByAction, fetchOfferAction} from '../thunks/offers.ts';
import {RequestStatus} from '../../const.ts';

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
  name: 'offer',
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
    // setNearBy: (state, action: PayloadAction<OfferList['id'] | undefined>) => {
    //   state.activeId = action.payload;
    // },
    // setOffer: (state, action: PayloadAction<OfferDetail>) => {
    //   state.offer = action.payload;
    // }
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
  // cityOffers: createSelector(offersSlice.selectors.offers, offersSlice.selectors.city, (allOffers, city) =>
  //   allOffers.filter((offer) => offer.city.name === city),
  // ),
  // activeOffer: createSelector(offersSlice.selectors.offers, offersSlice.selectors.activeId, (allOffers, id) =>
  //   allOffers.filter((offer) => {
  //     if (offer.id === id) {
  //       return offer;
  //     }
  //   }),
  // ),
};

export {offerActions, offerSelectors, offerSlice};
