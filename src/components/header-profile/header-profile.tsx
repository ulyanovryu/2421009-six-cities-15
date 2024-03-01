import {AppRoute, AuthorizationStatus} from '../../const';
import {Link} from 'react-router-dom';

type HeaderProfileProps = {
  authorizationStatus: AuthorizationStatus;
}

function HeaderProfile({authorizationStatus}:HeaderProfileProps): JSX.Element {
  return (
    authorizationStatus === AuthorizationStatus.Auth
      ?
      <li className="header__nav-item user">
        <Link to={AppRoute.Favorites} className="header__nav-link header__nav-link--profile">
          <div className="header__avatar-wrapper user__avatar-wrapper">
          </div>
          <span className="header__user-name user__name">O1liver.conner@gmail.com</span>
          <span className="header__favorite-count">3</span>
        </Link>
      </li>
      :
      <>
      </>
  );
}

export default HeaderProfile;
