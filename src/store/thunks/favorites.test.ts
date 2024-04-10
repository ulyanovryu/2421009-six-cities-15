import {configureMockStore} from '@jedmao/redux-mock-store';
import {createAPI} from '../../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import {Action} from 'redux';
import {AppThunkDispatch, extractActionsTypes, makeFakeOffer} from '../../utils/mocks';
import {State} from '../../types/state';
import {fetchFavoritesAction, changeFavoriteAction} from './favorites.ts';
import {APIRoute, FavoritesStatus} from '../../const';

describe('Favorites actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  const mockOffer = makeFakeOffer(FavoritesStatus.Removed);

  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator();
  });

  describe('fetchFavoritesAction', () => {
    it('should dispatch "fetchFavoritesAction.pending" and "fetchFavoritesAction.fulfilled" with thunk "fetchFavoritesAction', async () => {
      mockAxiosAdapter.onGet(`${APIRoute.Favorite}`).reply(200, [mockOffer]);
      await store.dispatch(fetchFavoritesAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchFavoritesAction.pending.type,
        fetchFavoritesAction.fulfilled.type,
      ]);
    });

    it('should dispatch "fetchFavoritesAction.pending" and "fetchFavoritesAction.rejected" when server response 400', async() => {
      mockAxiosAdapter.onGet(`${APIRoute.Favorite}`).reply(400, []);
      await store.dispatch(fetchFavoritesAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchFavoritesAction.pending.type,
        fetchFavoritesAction.rejected.type,
      ]);
    });

    it('fullfilled.payload should equal to answer fetchFavoritesAction', async() => {
      mockAxiosAdapter.onGet(`${APIRoute.Favorite}`).reply(200, [mockOffer]);
      await store.dispatch(fetchFavoritesAction());
      const fetchFavoritesActionFullfilled = store.getActions().at(1) as ReturnType<typeof fetchFavoritesAction.fulfilled>;

      expect(fetchFavoritesActionFullfilled.payload)
        .toEqual([mockOffer]);
    });
  });

  describe('changeFavoriteAction', () => {
    it('should dispatch "changeFavoriteAction.pending" and "changeFavoriteAction.fulfilled" with thunk "changeFavoriteAction', async () => {
      const status = FavoritesStatus.Added;
      const offerId = mockOffer.id;
      const route = `${APIRoute.Favorite}/${offerId}/${status}`;
      mockAxiosAdapter.onPost(route).reply(200, mockOffer);
      await store.dispatch(changeFavoriteAction({offerId:offerId, status:status}));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        changeFavoriteAction.pending.type,
        changeFavoriteAction.fulfilled.type,
      ]);
    });

    it('should dispatch "changeFavoriteAction.pending" and "changeFavoriteAction.rejected" when server response 400', async() => {
      const status = FavoritesStatus.Added;
      const offerId = mockOffer.id;
      const route = `${APIRoute.Favorite}/${offerId}/${status}`;
      mockAxiosAdapter.onPost(route).reply(400, []);
      await store.dispatch(changeFavoriteAction({offerId:offerId, status:status}));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        changeFavoriteAction.pending.type,
        changeFavoriteAction.rejected.type,
      ]);
    });

    it('fullfilled.payload should equal to answer changeFavoriteAction of adding to favorite', async() => {
      const status = FavoritesStatus.Added;
      const mockOfferFavorite = (() => {
        mockOffer.isFavorite = !!status;
        return mockOffer;
      })();
      const offerId = mockOffer.id;
      const route = `${APIRoute.Favorite}/${offerId}/${status}`;
      mockAxiosAdapter.onPost(route).reply(200, mockOfferFavorite);
      await store.dispatch(changeFavoriteAction({offerId:offerId, status:status}));

      const changeFavoriteActionFullfilled = store.getActions().at(1) as ReturnType<typeof changeFavoriteAction.fulfilled>;

      expect(changeFavoriteActionFullfilled.payload)
        .toEqual(mockOfferFavorite);
    });

    it('fullfilled.payload should equal to answer changeFavoriteAction of removing from favorite', async() => {
      const status = FavoritesStatus.Removed;
      const offerId = mockOffer.id;
      const route = `${APIRoute.Favorite}/${offerId}/${status}`;
      mockAxiosAdapter.onPost(route).reply(200, mockOffer);
      await store.dispatch(changeFavoriteAction({offerId:offerId, status:status}));

      const changeFavoriteActionFullfilled = store.getActions().at(1) as ReturnType<typeof changeFavoriteAction.fulfilled>;

      expect(changeFavoriteActionFullfilled.payload)
        .toEqual(mockOffer);
    });
  });


});
