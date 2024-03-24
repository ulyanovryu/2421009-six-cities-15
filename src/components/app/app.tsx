import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';

import {AppRoute} from '../../const';

import {Cities} from '../../types/cities.ts';
import {Offers} from '../../types/offers.ts';
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
// import Loading from '../loading';
// import {offersSelectors} from '../../store/slices/offers.ts';
// import {useAppSelector} from '../../hooks';

type AppProps = {
  citiesList: Cities;
  offersList: Offers;
  reviewsListData: ReviewsType;
  ratingsList: Ratings;
}

function App({citiesList, offersList, reviewsListData, ratingsList}: AppProps): JSX.Element {

  const authorizationStatus = getAuthorizationStatus();

  //const authorizationStatus = useAppSelector((state) => state.authorizationStatus);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Root} element={<Layout />}>

          <Route path={AppRoute.Root} index element={
            <Navigate to={`/${citiesList[0].id}`} />
          }
          />

          {citiesList.map((city) => (
            <Route
              index
              key={city.id}
              path={`/${city.id}`}
              element={
                <MainScreen
                  city={city.name}
                  citiesList={citiesList}
                />
              }
            />
          ))}

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
              citiesList={citiesList}
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
