import {BrowserRouter, Route, Routes} from 'react-router-dom';

import {AppRoute} from '../../const';

import Layout from '../../components/layout';
import PrivateRoute from '../../components/private-route';

import MainScreen from '../../pages/main-screen';
import LoginScreen from '../../pages/login-screen';
import OfferScreen from '../../pages/offer-screen';
import FavoritesScreen from '../../pages/favorites-screen';
import Page404Screen from '../../pages/page404-screen';
import getAuthorizationStatus from '../../utils/utils.ts';

type AppProps = {
  offersCount: number;
}

function App({offersCount}: AppProps): JSX.Element {

  const authorizationStatus = getAuthorizationStatus();

  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Root} element={<Layout />}>
          <Route index element={<MainScreen offersCount={offersCount}/>} />
          <Route path={AppRoute.Login} element={(
            <PrivateRoute authorizationStatus={authorizationStatus} isReverse>
              <LoginScreen />
            </PrivateRoute>
          )}
          />
          <Route path={AppRoute.Favorites} element={
            <PrivateRoute authorizationStatus={authorizationStatus}>
              <FavoritesScreen />
            </PrivateRoute>
          }
          />
          <Route path={AppRoute.Offer} element={<OfferScreen />} />
          <Route path="*" element={<Page404Screen />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
