import {Navigate} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';

import {useAppSelector} from '../../hooks';
import {authorizationSelectors} from '../../store/slices/auth.ts';

type PrivateRouteProps = {
  children: JSX.Element;
  isReverse?: boolean;
}

function PrivateRoute({children, isReverse}: PrivateRouteProps): JSX.Element {

  const authorizationStatus = useAppSelector(authorizationSelectors.authorizationStatus);

  return (
    authorizationStatus === (isReverse ? AuthorizationStatus.NoAuth : AuthorizationStatus.Auth) ||
    authorizationStatus === (isReverse ? AuthorizationStatus.Unknown : AuthorizationStatus.Auth)
      ? children
      : <Navigate to={isReverse ? AppRoute.Root : AppRoute.Login} />
  );
}

export default PrivateRoute;
