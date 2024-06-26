import {memo, useCallback} from 'react';
import {generatePath, Link} from 'react-router-dom';

import {useActionCreators} from '../../hooks';
import {OfferList, OffersListTemplate} from '../../types/offers.ts';
import {offersActions} from '../../store/slices/offers.ts';
import {getCardParams, handleArticleMouseEnter, handleArticleMouseOut} from './utils.ts';
import {getUpperString} from '../../utils/utils.ts';
import MemorizedFavoriteButton from '../favorite-button';
import {AppRoute, RATING_MULTIPLIER} from '../../const.ts';

type OfferProps = {
  offerParams: OfferList;
  offersListTemplate: OffersListTemplate;
  hovered?: boolean;
}

function OfferCard({offerParams, offersListTemplate, hovered}: OfferProps): JSX.Element {

  const {setActiveId} = useActionCreators(offersActions);

  const {id, isPremium, isFavorite, title, price, rating, type, previewImage} = offerParams;

  const ratingWidth : number = RATING_MULTIPLIER * Math.round(rating);
  const linkDetail = generatePath(AppRoute.Offer,{id:id});

  const upperType = getUpperString(type);

  const {classNames, width, height} = getCardParams(offersListTemplate);

  const memorizedHandleMouseEnter = useCallback(() => handleArticleMouseEnter(id, setActiveId, hovered), [id, setActiveId, hovered]);
  const memorizedHandleMouseOut = useCallback(() => handleArticleMouseOut(setActiveId, hovered), [setActiveId, hovered]);

  return (
    <article
      className={classNames.article}
      data-id={id}
      onMouseEnter={memorizedHandleMouseEnter}
      onMouseOut={memorizedHandleMouseOut}
    >
      {
        isPremium && (
          <div className="place-card__mark">
            <span>Premium</span>
          </div>
        )
      }
      <div className={classNames.image}>
        <Link to={linkDetail}>
          <img className="place-card__image" src={previewImage} width={width} height={height} alt={title} />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <MemorizedFavoriteButton offerId={id} isFavorite={isFavorite} />
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

const MemorizedOfferCard = memo(OfferCard);

export default MemorizedOfferCard;
