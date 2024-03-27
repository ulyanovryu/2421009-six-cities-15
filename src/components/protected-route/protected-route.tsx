import {Navigate, Location, useLocation} from 'react-router-dom';
import {AppRoute} from '../../const';

import {useAuth} from '../../hooks/user-authorization.ts';

type ProtectedRouteProps = {
  children: JSX.Element;
  onlyUnAuth?: boolean;
}

type FromState = {
  from?: Location;
}

function ProtectedRoute({children, onlyUnAuth}: ProtectedRouteProps): JSX.Element {

  const location: Location<FromState> = useLocation() as Location<FromState>;
  const isAuth = useAuth();

  if (onlyUnAuth && isAuth) {
    const from = location.state?.from || {pathname: AppRoute.Root};
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !isAuth) {
    return <Navigate state={{from:location}} to={AppRoute.Login} />;
  }

  return children;
}

export default ProtectedRoute;
