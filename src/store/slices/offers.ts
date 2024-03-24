import {createSlice, PayloadAction} from '@reduxjs/toolkit';
// import {createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit';
// import {CITIES} from '../../const.ts';
// import {CityName} from '../../types/cities.ts';
import {Offers, Offer} from '../../types/offers.ts';

interface OffersState {
 // city: CityName;
  activeId?: Offer['id'];
  offers: Offers;
  isOffersDataLoading: boolean;
}

const initialState: OffersState = {
  //city: CITIES[0].name,
  activeId: undefined,
  offers: [],
  isOffersDataLoading: false,
};


const offersSlice = createSlice({
  initialState,
  name: 'offers',
  reducers: {
    setActiveId: (state, action: PayloadAction<Offer['id'] | undefined>) => {
      state.activeId = action.payload;
    },
    setOffers: (state, action: PayloadAction<Offers>) => {
      state.offers = action.payload;
    },
    setOffersDataLoading: (state, action: PayloadAction<boolean>) => {
      state.isOffersDataLoading = action.payload;
    },
  },
  selectors: {
    //city: (state:OffersState) => state.city,
    activeId: (state:OffersState) => state.activeId,
    offers: (state:OffersState) => state.offers,
    isOffersDataLoading: (state:OffersState) => state.isOffersDataLoading,
  }
});

const offersActions = offersSlice.actions;
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
