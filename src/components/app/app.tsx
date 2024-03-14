import {BrowserRouter, Route, Routes} from 'react-router-dom';

import {AppRoute} from '../../const';

import {Cities} from '../../types/cities.ts';
import {Offers} from '../../types/offers.ts';
import {SortingsList} from '../../types/sorting.ts';
import {ReviewsType} from '../../types/reviews.ts';
import {Ratings} from '../../types/rating.ts';

import Layout from '../../components/layout';

import PrivateRoute from '../../components/private-route';
import MainScreen from '../../pages/main-screen';
import LoginScreen from '../../pages/login-screen';
import OfferScreen from '../../pages/offer-screen';
import FavoritesScreen from '../../pages/favorites-screen';
import Page404Screen from '../../pages/page404-screen';
import getAuthorizationStatus from '../../utils/utils.ts';

type AppProps = {
  citiesList: Cities;
  offersList: Offers;
  sortingsList: SortingsList;
  reviewsListData: ReviewsType;
  ratingsList: Ratings;
  offersCount: number;
}

function App({citiesList, offersCount, offersList, sortingsList, reviewsListData, ratingsList}: AppProps): JSX.Element {

  const authorizationStatus = getAuthorizationStatus();

  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Root} element={<Layout />}>
          <Route index element={
            <MainScreen
              offersCount={offersCount}
              citiesList={citiesList}
              offersList={offersList}
              sortingsList={sortingsList}
            />
          }
          />
          <Route path={AppRoute.Login} element={(
            <PrivateRoute authorizationStatus={authorizationStatus} isReverse>
              <LoginScreen />
            </PrivateRoute>
          )}
          />
          <Route path={AppRoute.Favorites} element={
            <PrivateRoute authorizationStatus={authorizationStatus}>
              <FavoritesScreen offersList={offersList} citiesList={citiesList} />
            </PrivateRoute>
          }
          />
          <Route path={AppRoute.Offer} element={
            <OfferScreen
              offersList={offersList}
              reviewsList={reviewsListData}
              ratingsList={ratingsList}
            />
          }
          />
          <Route path="*" element={<Page404Screen />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
