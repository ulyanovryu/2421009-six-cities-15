import {AppRoute, AuthorizationStatus} from '../../const';
import {Link} from 'react-router-dom';

type HeaderLoginProps = {
  authorizationStatus: AuthorizationStatus;
}

function HeaderLogin({authorizationStatus}:HeaderLoginProps): JSX.Element {
  return (
    authorizationStatus === AuthorizationStatus.Auth
      ?
      <li className="header__nav-item">
        <Link to={AppRoute.Root} className="header__nav-link">
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
