//import {Cities} from './types/cities.ts';

import {City} from './types/cities.ts';

export enum ImgPath {
  Logo = 'img/logo.svg',
}

export enum AppRoute {
  Root = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer/:id',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const URL_MARKER_DEFAULT =
  'img/pin.svg';

export const URL_MARKER_CURRENT =
  'img/pin-active.svg';

export const CITIES = [
  {
    'name' : 'Paris',
    'id' : 'paris',
    'location': {
      'latitude': 48.856663,
      'longitude': 2.351556,
      'zoom': 8
    }
  },{
    'name' : 'Cologne',
    'id' : 'cologne',
    'location': {
      'latitude': 50.930779,
      'longitude': 6.938399,
      'zoom': 8
    }
  },{
    'name' : 'Brussels',
    'id' : 'brussels',
    'location': {
      'latitude': 50.854283,
      'longitude': 4.352131,
      'zoom': 8
    }
  },{
    'name' : 'Amsterdam',
    'id' : 'amsterdam',
    'location': {
      'latitude': 52.373057,
      'longitude': 4.892557,
      'zoom': 8
    }
  },{
    'name' : 'Hamburg',
    'id' : 'hamburg',
    'location': {
      'latitude': 53.567103,
      'longitude': 9.941934,
      'zoom': 8
    }
  },{
    'name' : 'Dusseldorf',
    'id' : 'dusseldorf',
    'location': {
      'latitude': 51.230569,
      'longitude': 6.787428,
      'zoom': 8
    }
  },
] as const;

export const DEFAULT_CITY: City = CITIES[0];

export const SORT_OPTIONS = ['Popular', 'Price: low to high', 'Price: high to low', 'Top rated first'] satisfies Record<SortOption, string>;
export const enum SortOption {
  Popular,
  PriceLowToHigh,
  PriceHighToLow,
  TopRatedFirst
}
export const OFFER_TYPE = ['Apartment', 'Room', 'House', 'Hotel'] as const;

export type OfferType = (typeof OFFER_TYPE)[number];
