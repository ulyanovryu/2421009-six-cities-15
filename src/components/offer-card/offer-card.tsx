import {OfferList, OffersListTemplate} from '../../types/offers.ts';

import {Link} from 'react-router-dom';
import {upperString} from '../../utils/utils.ts';
import {useActionCreators} from '../../hooks';
import {offersActions} from '../../store/slices/offers.ts';
import FavoriteButton from '../favorite-button';

type OfferProps = {
  offerParams: OfferList;
  offersListTemplate: OffersListTemplate;
} & {hovered?: boolean}

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

function OfferCard({offerParams, offersListTemplate, hovered}: OfferProps): JSX.Element {

  const {setActiveId} = useActionCreators(offersActions);

  const {id, isPremium, isFavorite, title, price, rating, type, previewImage} = offerParams;

  const ratingWidth : number = 20 * rating;
  const linkDetail : string = `/offer/${id}`;

  const upperType = upperString(type);

  const classesTemplate = offerListClasses(offersListTemplate);

  return (
    <article
      className={classesTemplate.article}
      data-id={id}
      onMouseEnter={() => hovered && setActiveId(id)}
      onMouseOut={() => hovered && setActiveId(undefined)}
    >
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
          <FavoriteButton offerId={id} isFavorite={isFavorite} width={18} />
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

export default OfferCard;
