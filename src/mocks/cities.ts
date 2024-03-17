import {Cities} from '../types/cities.ts';
import {AppRoute} from '../const.ts';

const citiesList: Cities = [
  {
    'name' : 'Paris',
    'link' : AppRoute.Root,
    'id' : 1,
    'location': {
      'latitude': 48.856663,
      'longitude': 2.351556,
      'zoom': 8
    }
  },{
    'name' : 'Cologne',
    'link' : AppRoute.Root,
    'id' : 2,
    'location': {
      'latitude': 50.930779,
      'longitude': 6.938399,
      'zoom': 8
    }
  },{
    'name' : 'Brussels',
    'link' : AppRoute.Root,
    'id' : 3,
    'location': {
      'latitude': 50.854283,
      'longitude': 4.352131,
      'zoom': 8
    }
  },{
    'name' : 'Amsterdam',
    'link' : AppRoute.Root,
    'id' : 4,
    'location': {
      'latitude': 52.373057,
      'longitude': 4.892557,
      'zoom': 8
    }
  },{
    'name' : 'Hamburg',
    'link' : AppRoute.Root,
    'id' : 5,
    'location': {
      'latitude': 53.567103,
      'longitude': 9.941934,
      'zoom': 8
    }
  },{
    'name' : 'Dusseldorf',
    'link' : AppRoute.Root,
    'id' : 6,
    'location': {
      'latitude': 51.230569,
      'longitude': 6.787428,
      'zoom': 8
    }
  },
];
export default citiesList;
