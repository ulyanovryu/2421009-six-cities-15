import {configureMockStore} from '@jedmao/redux-mock-store';
import {createAPI} from '../../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import {Action} from 'redux';
import {AppThunkDispatch, extractActionsTypes, makeFakeOffer} from '../../utils/mocks';
import {State} from '../../types/state';
import {fetchOffersAction, fetchNearByAction, fetchOfferAction} from './offers.ts';
import {APIRoute, FavoritesStatus} from '../../const';

describe('Offers actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  const mockOffer = makeFakeOffer(FavoritesStatus.Removed);

  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator();
  });

  describe('fetchOffersAction', () => {
    it('should dispatch "fetchOffersAction.pending" and "fetchOffersAction.fulfilled" with thunk "fetchOffersAction', async () => {
      mockAxiosAdapter.onGet(`${APIRoute.Offers}`).reply(200, [mockOffer]);
      await store.dispatch(fetchOffersAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchOffersAction.pending.type,
        fetchOffersAction.fulfilled.type,
      ]);
    });

    it('should dispatch "fetchOffersAction.pending" and "fetchOffersAction.rejected" when server response 400', async() => {
      mockAxiosAdapter.onGet(`${APIRoute.Offers}`).reply(400, []);
      await store.dispatch(fetchOffersAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchOffersAction.pending.type,
        fetchOffersAction.rejected.type,
      ]);
    });

    it('fullfilled.payload should equal to answer fetchOffersAction', async() => {
      mockAxiosAdapter.onGet(`${APIRoute.Offers}`).reply(200, [mockOffer]);
      await store.dispatch(fetchOffersAction());
      const fetchOffersActionFullfilled = store.getActions().at(1) as ReturnType<typeof fetchOffersAction.fulfilled>;

      expect(fetchOffersActionFullfilled.payload)
        .toEqual([mockOffer]);
    });
  });

  describe('fetchOfferAction', () => {
    it('should dispatch "fetchOfferAction.pending" and "fetchOfferAction.fulfilled" with thunk "fetchOfferAction', async () => {
      const offerId = mockOffer.id;
      const route = `${APIRoute.Offers}/${offerId}`;
      mockAxiosAdapter.onGet(route).reply(200, mockOffer);
      await store.dispatch(fetchOfferAction(offerId));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchOfferAction.pending.type,
        fetchOfferAction.fulfilled.type,
      ]);
    });

    it('should dispatch "fetchOfferAction.pending" and "fetchOfferAction.rejected" when server response 400', async() => {
      const offerId = mockOffer.id;
      const route = `${APIRoute.Offers}/${offerId}`;
      mockAxiosAdapter.onGet(route).reply(400, []);
      await store.dispatch(fetchOfferAction(offerId));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchOfferAction.pending.type,
        fetchOfferAction.rejected.type,
      ]);
    });

    it('fullfilled.payload should equal to answer fetchOfferAction', async() => {
      const offerId = mockOffer.id;
      const route = `${APIRoute.Offers}/${offerId}`;
      mockAxiosAdapter.onGet(route).reply(200, mockOffer);
      await store.dispatch(fetchOfferAction(offerId));
      const fetchOfferActionFullfilled = store.getActions().at(1) as ReturnType<typeof fetchOfferAction.fulfilled>;

      expect(fetchOfferActionFullfilled.payload)
        .toEqual(mockOffer);
    });
  });

  describe('fetchNearByAction', () => {
    it('should dispatch "fetchNearByAction.pending" and "fetchNearByAction.fulfilled" with thunk "fetchNearByAction', async () => {
      const offerId = mockOffer.id;
      const route = `${APIRoute.Offers}/${offerId}/nearby`;
      mockAxiosAdapter.onGet(route).reply(200, mockOffer);
      await store.dispatch(fetchNearByAction(offerId));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchNearByAction.pending.type,
        fetchNearByAction.fulfilled.type,
      ]);
    });

    it('should dispatch "fetchNearByAction.pending" and "fetchNearByAction.rejected" when server response 400', async() => {
      const offerId = mockOffer.id;
      const route = `${APIRoute.Offers}/${offerId}/nearby`;
      mockAxiosAdapter.onGet(route).reply(400, []);
      await store.dispatch(fetchNearByAction(offerId));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchNearByAction.pending.type,
        fetchNearByAction.rejected.type,
      ]);
    });

    it('fullfilled.payload should equal to answer fetchNearByAction', async() => {
      const offerId = mockOffer.id;
      const route = `${APIRoute.Offers}/${offerId}/nearby`;
      mockAxiosAdapter.onGet(route).reply(200, [mockOffer]);
      await store.dispatch(fetchNearByAction(offerId));
      const fetchNearByActionFullfilled = store.getActions().at(1) as ReturnType<typeof fetchNearByAction.fulfilled>;

      expect(fetchNearByActionFullfilled.payload)
        .toEqual([mockOffer]);
    });
  });
});
