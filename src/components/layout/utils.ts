import {AppRoute} from '../../const.ts';

const getLayoutParams = (pathname: AppRoute) => {
  let pageClass: string = 'page';
  let showFooter: boolean = false;
  let showHeaderUserInfo : boolean = true;

  switch (pathname) {
    case '/' :
      pageClass = 'page page--gray page--main';
      break;
    case '/favorites' :
      pageClass = 'page';
      showFooter = true;
      break;
    case '/login' :
      pageClass = 'page page--gray page--login';
      showHeaderUserInfo = false;
      break;
  }

  return {pageClass, showFooter, showHeaderUserInfo};
};

export default getLayoutParams;
