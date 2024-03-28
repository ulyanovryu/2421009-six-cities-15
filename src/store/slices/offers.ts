import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {OfferList, Offers} from '../../types/offers.ts';
import {fetchOffersAction} from '../thunks/offers.ts';
import {RequestStatus, StoreSlices} from '../../const.ts';

interface OffersState {
  activeId?: OfferList['id'];
  offers: Offers;
  status: RequestStatus;
}

const initialState: OffersState = {
  activeId: undefined,
  offers: [],
  status: RequestStatus.Idle,
};

const offersSlice = createSlice({
  initialState,
  name: StoreSlices.Offers,
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.status = RequestStatus.Success;
        state.offers = action.payload;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.status = RequestStatus.Failed;
      });
  },
  reducers: {
    setActiveId: (state, action: PayloadAction<OfferList['id'] | undefined>) => {
      state.activeId = action.payload;
    },
  },
  selectors: {
    activeId: (state:OffersState) => state.activeId,
    offers: (state:OffersState) => state.offers,
    status: (state:OffersState) => state.status,
  }
});

const offersActions = {...offersSlice.actions, fetchOffersAction};
const offersSelectors = {
  ...offersSlice.selectors,
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

export {offersActions, offersSelectors, offersSlice};
