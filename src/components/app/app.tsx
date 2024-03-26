import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';

import {useEffect} from 'react';

import {AppRoute, DEFAULT_CITY} from '../../const';
import {useActionCreators} from '../../hooks';
import {getToken} from '../../services/token.ts';

import {Cities} from '../../types/cities.ts';
import {Offers} from '../../types/offers.ts';
import {Ratings} from '../../types/rating.ts';

import Layout from '../../components/layout';

import MainScreen from '../../pages/main-screen';
import LoginScreen from '../../pages/login-screen';
import OfferScreen from '../../pages/offer-screen';
import FavoritesScreen from '../../pages/favorites-screen';
import Page404Screen from '../../pages/page404-screen';
import ProtectedRoute from '../protected-route';

import {offersActions} from '../../store/slices/offers.ts';
import {userActions} from '../../store/slices/user.ts';

type AppProps = {
  citiesList: Cities;
  offersList: Offers;
  ratingsList: Ratings;
}

function App({citiesList, offersList, ratingsList}: AppProps): JSX.Element {

  const {fetchOffersAction} = useActionCreators(offersActions);
  const {checkAuthAction} = useActionCreators(userActions);
  const token = getToken();

  useEffect(() => {
    fetchOffersAction()
      .unwrap()
      .then (() => {
      })
      .catch();
  });

  useEffect(() => {
    if (token) {
      checkAuthAction();
    }
  }, [token, checkAuthAction]);

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
              <ProtectedRoute onlyUnAuth>
                <LoginScreen />
              </ProtectedRoute>
            )}
            />
            <Route path={AppRoute.Favorites} element={
              <ProtectedRoute>
                <FavoritesScreen offersList={offersList} citiesList={citiesList} />
              </ProtectedRoute>
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
