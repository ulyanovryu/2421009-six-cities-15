import {Offer, OffersListTemplate} from '../../types/offers.ts';

import {Link} from 'react-router-dom';
import {upperString} from '../../utils/utils.ts';

type OfferProps = {
  offerParams: Offer;
  onMouseOver: (offer?: Offer) => void;
  offersListTemplate: OffersListTemplate;
}

type OffelListClassesType = {
  'article' : string;
  'image' : string;
}

const offerListClasses = (template:string): OffelListClassesType => {

  let classNames: OffelListClassesType = {'article' : '', 'image' : ''};

  switch (template) {
    case 'mainScreen':
      classNames = {'article' : 'cities__card place-card', 'image' : 'cities__image-wrapper place-card__image-wrapper'};
      break;
    case 'offerScreen':
      classNames = {'article' : 'near-places__card place-card', 'image' : 'near-places__image-wrapper place-card__image-wrapper'};
      break;
    case 'favoriteScreen':
      classNames = {'article' : 'favorites__card place-card', 'image' : 'favorites__image-wrapper place-card__image-wrapper'};
      break;
    default :
      classNames = {'article' : 'place-card', 'image' : 'place-card__image-wrapper'};
  }

  return classNames;
};

function OfferList({offerParams, offersListTemplate, onMouseOver}: OfferProps): JSX.Element {

  const {id, isPremium, isFavorite, title, price, rating, type, previewImage} = offerParams;

  const ratingWidth : number = 20 * rating;
  const linkDetail : string = `/offer/${id}`;
  const bookmarkClass : string = !isFavorite ? 'place-card__bookmark-button button' : 'place-card__bookmark-button place-card__bookmark-button--active button';
  const bookmarkState : string = !isFavorite ? 'To bookmarks' : 'In bookmarks';
  const upperType = upperString(type);

  const mouseOver = () => {
    onMouseOver(offerParams);
  };

  const mouseOut = () => {
    onMouseOver();
  };

  const classesTemplate = offerListClasses(offersListTemplate);

  return (
    <article className={classesTemplate.article} onMouseEnter={mouseOver} onMouseOut={mouseOut}>
      {
        isPremium ?
          <div className="place-card__mark">
            <span>Premium</span>
          </div>
          : null
      }
      <div className={classesTemplate.image}>
        <Link to={linkDetail}>
          <img className="place-card__image" src={previewImage} width="260" height="200" alt={title} />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={bookmarkClass} type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">{bookmarkState}</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${ratingWidth}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={linkDetail}>{title}</Link>
        </h2>
        <p className="place-card__type">{upperType}</p>
      </div>
    </article>
  );
}

export default OfferList;
