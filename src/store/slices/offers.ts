import {createSlice, PayloadAction} from '@reduxjs/toolkit';
// import {createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit';
// import {CITIES} from '../../const.ts';
// import {CityName} from '../../types/cities.ts';
import {OfferList, Offers} from '../../types/offers.ts';
import {fetchOffersAction} from '../thunks/offers.ts';
import {RequestStatus} from '../../const.ts';

interface OffersState {
 // city: CityName;
  activeId?: OfferList['id'];
  offers: Offers;
  status: RequestStatus;
}

const initialState: OffersState = {
  //city: CITIES[0].name,
  activeId: undefined,
  offers: [],
  status: RequestStatus.Idle,
};

const offersSlice = createSlice({
  initialState,
  name: 'offers',
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
    setOffers: (state, action: PayloadAction<Offers>) => {
      state.offers = action.payload;
    }
  },
  selectors: {
    //city: (state:OffersState) => state.city,
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
