import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';

import {AppRoute, DEFAULT_CITY} from '../../const';

import {Cities} from '../../types/cities.ts';
import {Offers} from '../../types/offers.ts';
import {Ratings} from '../../types/rating.ts';

import Layout from '../../components/layout';

import PrivateRoute from '../../components/private-route';
import MainScreen from '../../pages/main-screen';
import LoginScreen from '../../pages/login-screen';
import OfferScreen from '../../pages/offer-screen';
import FavoritesScreen from '../../pages/favorites-screen';
import Page404Screen from '../../pages/page404-screen';
import {offersActions} from '../../store/slices/offers.ts';
import {useActionCreators} from '../../hooks';
import {useEffect} from 'react';
// import Loading from '../loading';
// import {offersSelectors} from '../../store/slices/offers.ts';
// import {useAppSelector} from '../../hooks';

type AppProps = {
  citiesList: Cities;
  offersList: Offers;
  ratingsList: Ratings;
}

function App({citiesList, offersList, ratingsList}: AppProps): JSX.Element {

  const {fetchOffersAction} = useActionCreators(offersActions);

  useEffect(() => {
    fetchOffersAction()
      .unwrap()
      .then (() => {
      })
      .catch();
  });

  //const authorizationStatus = getAuthorizationStatus();
  //const authorizationStatus = useAppSelector((state) => state.authorizationStatus);

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path={AppRoute.Root} element={<Layout />}>

            <Route path={AppRoute.Root} index element={
              <Navigate to={`/${DEFAULT_CITY.id}`} />
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
              <PrivateRoute isReverse>
                <LoginScreen />
              </PrivateRoute>
            )}
            />
            <Route path={AppRoute.Favorites} element={
              <PrivateRoute>
                <FavoritesScreen offersList={offersList} citiesList={citiesList} />
              </PrivateRoute>
            }
            />
            <Route path={AppRoute.Offer} element={
              <OfferScreen
                citiesList={citiesList}
                ratingsList={ratingsList}
              />
            }
            />
            <Route path="*" element={<Page404Screen />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
