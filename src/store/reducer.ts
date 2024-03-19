import {createReducer} from '@reduxjs/toolkit';
import {changeCity, changeOffers} from './action';

const initialState = {
  city: 'Paris',
  offers: {}
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      const {city} = action.payload;
      state.city = city.name;
    })
    .addCase(changeOffers, (state, action) => {
      const {offers} = action.payload;
      state.offers = offers;
    });
});

export {reducer};
