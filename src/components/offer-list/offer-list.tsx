import OffersList from '../../mocks/offers-list.ts';
import {Link} from 'react-router-dom';

function OfferList({id, isPremium, isFavorite, title, price, rating, type, previewImage}: OffersList): JSX.Element {

  const ratingWidth : number = 20 * rating;
  const linkDetail : string = `/offer/${id}`;
  const bookmarkClass : string = !isFavorite ? 'place-card__bookmark-button button' : 'place-card__bookmark-button place-card__bookmark-button--active button';
  const bookmarkState : string = !isFavorite ? 'To bookmarks' : 'In bookmarks';
  const upperType : string = type.charAt(0).toUpperCase() + type.slice(1);

  return (
    <article className="cities__card place-card">
      {
        isPremium ?
          <div className="place-card__mark">
            <span>Premium</span>
          </div>
          : null
      }
      <div className="cities__image-wrapper place-card__image-wrapper">
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
