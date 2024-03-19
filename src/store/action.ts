import {createAction} from '@reduxjs/toolkit';
import {City} from '../types/cities.ts';
import {Offers} from '../types/offers.ts';

export const changeCity = createAction<{city: City}>('city/change');
export const changeOffers = createAction<{offers: Offers}>('offers/change');
