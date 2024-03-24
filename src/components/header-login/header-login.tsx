import {AppRoute, AuthorizationStatus} from '../../const';
import {Link} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {authorizationSelectors} from '../../store/slices/auth.ts';
import {logoutAction} from '../../store/thunks/api.ts';

function HeaderLogin(): JSX.Element {

  const authorizationStatus = useAppSelector(authorizationSelectors.authorizationStatus);
  const dispatch = useAppDispatch();

  const handlerSignOut = () => {
    dispatch(logoutAction());
  };

  return (
    authorizationStatus === AuthorizationStatus.Auth
      ?
      <li className="header__nav-item">
        <Link to={AppRoute.Root} className="header__nav-link" onClick={handlerSignOut}>
          <span className="header__signout">Sign out</span>
        </Link>
      </li>
      :
      <li className="header__nav-item user">
        <Link to={AppRoute.Login} className="header__nav-link header__nav-link--profile">
          <div className="header__avatar-wrapper user__avatar-wrapper"></div>
          <span className="header__login">Sign in</span>
        </Link>
      </li>
  );
}

export default HeaderLogin;
