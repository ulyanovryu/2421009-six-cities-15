
import {NavLink, useLocation, Outlet} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const.ts';
import HeaderLogin from '../header-login/header-login.tsx';
import HeaderProfile from '../header-profile/header-profile.tsx';

function LayoutPageClass () {

  const {pathname} = useLocation();

  let className:string = 'page';
  switch (pathname) {
    case '/' : className = 'page page--gray page--main';
      break;
    case '/favorites' : className = 'page';
      break;
    case '/login' : className = 'page page--gray page--login';
      break;
    case '/offer' : className = 'page';
      break;
  }

  return className;
}

type LayoutProps = {
  authorizationStatus: AuthorizationStatus;
}

function Layout ({authorizationStatus}: LayoutProps): JSX.Element {
  return (
    <div className={LayoutPageClass()}>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <NavLink to={AppRoute.Root} title={AppRoute.Root} className={({ isActive }) => `header__logo-link${ isActive ? ' header__logo-link--active' : ''}`}>
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </NavLink >{' '}
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <HeaderProfile authorizationStatus={authorizationStatus} />
                <HeaderLogin authorizationStatus={authorizationStatus} />
              </ul>
            </nav>
          </div>
        </div>
      </header>
      <Outlet />
    </div>
  );
}

export default Layout;
