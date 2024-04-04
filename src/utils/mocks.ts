import {random, datatype, address, lorem, name, internet} from 'faker';

// import { Action } from 'redux';
// import { ThunkDispatch } from 'redux-thunk';
// import { createAPI } from '../services/api';
// import { State } from '../types/state';
import {OfferDetail} from '../types/offers.ts';
import {FavoritesStatus} from '../const.ts';

// export type AppThunkDispatch = ThunkDispatch<State, ReturnType<typeof createAPI>, Action>;


export const makeFakeOffer = (isFavorite: FavoritesStatus): OfferDetail => ({
  'id': random.word(),
  'title': lorem.words(),
  'type': random.word(),
  'price': datatype.number(),
  'city': {
    'name': address.cityName(),
    'location': {
      'latitude': Number(address.latitude(50, 55, 10)),
      'longitude': Number(address.longitude(4, 10, 10)),
      'zoom': datatype.number(),
    }},
  'location': {
    'latitude': Number(address.latitude(50, 55, 10)),
    'longitude': Number(address.longitude(4, 10, 10)),
    'zoom': datatype.number(),
  },
  'isFavorite': !!isFavorite,
  'isPremium': datatype.boolean(),
  'rating': datatype.number(5),
  'description': lorem.paragraph(1),
  'bedrooms': datatype.number(10),
  'goods': [
    random.word(),
  ],
  'host': {
    'name': name.firstName(),
    'avatarUrl': internet.avatar(),
    'isPro': datatype.boolean()
  },
  'images': [
    internet.url()
  ],
  'maxAdults': datatype.number(100)
} as OfferDetail);

// export const makeFakeArtistQuestion = (): QuestionArtist => ({
//   type: GameType.Artist,
//   song: {
//     artist: name.title(),
//     src: system.filePath(),
//   },
//   answers: new Array(3).fill(null).map(() => (
//     { picture: internet.avatar(), artist: name.title() }
//   )),
// } as QuestionArtist);
//
// export const makeFakeGenreQuestion = (): QuestionGenre => ({
//   type: GameType.Genre,
//   genre: music.genre(),
//   answers: new Array(4).fill(null).map(() => (
//     { src: system.filePath(), genre: music.genre() }),
//   ),
// } as QuestionGenre);
//
// export const extractActionsTypes = (actions: Action<string>[]) => actions.map(({ type }) => type);
//
// export const makeFakeStore = (initialState?: Partial<State>): State => ({
//   USER: { authorizationStatus: AuthorizationStatus.NoAuth },
//   DATA: { isQuestionsDataLoading: false, questions: [], hasError: false },
//   GAME: {step: 10, mistakes: 2},
//   ...initialState ?? {},
// });
