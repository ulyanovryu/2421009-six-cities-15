import {AppRoute, CITIES} from '../../const.ts';

const getLayoutParams = (pathname: AppRoute) => {
  let pageClass: string = 'page';
  let showFooter: boolean = false;
  let showHeaderUserInfo : boolean = true;

  const cities = CITIES.map((city) => (`/${city.id}`));

  if (pathname === AppRoute.Root) {
    pageClass = 'page page--gray page--main';
  } else if (pathname === AppRoute.Favorites) {
    pageClass = 'page';
    showFooter = true;
  } else if (pathname === AppRoute.Login) {
    pageClass = 'page page--gray page--login';
    showHeaderUserInfo = false;
  } else if (cities.includes(pathname)) {
    pageClass = 'page page--gray page--main';
  }

  return {pageClass, showFooter, showHeaderUserInfo};
};

export default getLayoutParams;
