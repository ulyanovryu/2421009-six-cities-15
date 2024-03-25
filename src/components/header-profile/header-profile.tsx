import {AppRoute} from '../../const';
import {Link} from 'react-router-dom';
import {useAppSelector} from '../../hooks';
import {userSelectors} from '../../store/slices/user.ts';
import {useAuth} from '../../hooks/user-authorization.ts';

function HeaderProfile(): JSX.Element {

  const {email, avatarUrl} = useAppSelector(userSelectors.user);

  return (
    useAuth()
      ?
      <li className="header__nav-item user">
        <Link to={AppRoute.Favorites} className="header__nav-link header__nav-link--profile">
          <div className="header__avatar-wrapper user__avatar-wrapper" style={{backgroundImage:`url(${avatarUrl})`}}></div>
          <span className="header__user-name user__name">{email}</span>
          <span className="header__favorite-count">3</span>
        </Link>
      </li>
      :
      <>
      </>
  );
}

export default HeaderProfile;
