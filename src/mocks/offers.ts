import {Offers} from '../types/offers.ts';

const OffersList: Offers = [
  {
    'id': '6af6f711-c28d-4121-82cd-e0b462a27f00',
    'title': 'Beautiful & luxurious studio at great location',
    'type': 'hostel',
    'price': 100,
    'city': {
      'name': 'Amsterdam',
      'location': {
        'latitude': 52.35514938496378,
        'longitude': 4.673877537499948,
        'zoom': 8
      }
    },
    'location': {
      'latitude': 52.35514938496378,
      'longitude': 4.673877537499948,
      'zoom': 8
    },
    'isFavorite': false,
    'isPremium': false,
    'rating': 5,
    'previewImage': 'img/apartment-01.jpg'
  },{
    'id': '1af6f711-c28d-4121-82cd-e0b462a27f00',
    'title': 'Wood and stone place',
    'type': 'apartment',
    'price': 80,
    'city': {
      'name': 'Paris',
      'location': {
        'latitude': 52.35514938496378,
        'longitude': 4.673877537499948,
        'zoom': 8
      }
    },
    'location': {
      'latitude': 52.35514938496378,
      'longitude': 4.673877537499948,
      'zoom': 8
    },
    'isFavorite': true,
    'isPremium': true,
    'rating': 3,
    'previewImage': 'img/apartment-02.jpg'
  },{
    'id': '2af6f711-c28d-4121-82cd-e0b462a27f00',
    'title': 'Lxurious studio at great location',
    'type': 'room',
    'price': 60,
    'city': {
      'name': 'Hamburg',
      'location': {
        'latitude': 52.35514938496378,
        'longitude': 4.673877537499948,
        'zoom': 8
      }
    },
    'location': {
      'latitude': 52.35514938496378,
      'longitude': 4.673877537499948,
      'zoom': 8
    },
    'isFavorite': false,
    'isPremium': true,
    'rating': 1,
    'previewImage': 'img/apartment-03.jpg'
  },{
    'id': '3af6f711-c28d-4121-82cd-e0b462a27f00',
    'title': 'Studio at great location',
    'type': 'hostel',
    'price': 40,
    'city': {
      'name': 'Dusseldorf',
      'location': {
        'latitude': 52.35514938496378,
        'longitude': 4.673877537499948,
        'zoom': 8
      }
    },
    'location': {
      'latitude': 52.35514938496378,
      'longitude': 4.673877537499948,
      'zoom': 8
    },
    'isFavorite': false,
    'isPremium': false,
    'rating': 5,
    'previewImage': 'img/apartment-01.jpg'
  },
];

export default OffersList;
