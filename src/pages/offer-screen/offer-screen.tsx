import {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useActionCreators, useAppSelector} from '../../hooks';
import {useAuth} from '../../hooks/user-authorization.ts';

import {CITIES, MaxCountLimit, RATING_MULTIPLIER, RequestStatus,} from '../../const.ts';

import {getActiveCityParams, getPlural, getUpperString} from '../../utils/utils.ts';
import Page404Screen from '../page404-screen';

import {offerActions, offerSelectors} from '../../store/slices/offer.ts';
import {reviewsActions, reviewsSelectors} from '../../store/slices/reviews.ts';

import MemorizedReviews from '../../components/reviews';
import MemorizedOffersList from '../../components/offers-list';
import Map from '../../components/map';
import MemorizedLoading from '../../components/loading';
import MemorizedFavoriteButton from '../../components/favorite-button';
import MemorizedOfferGalleries from '../../components/offer-galleries';
import MemorizedOfferGoodsList from '../../components/offer-goods-list';

import {CityName} from '../../types/cities.ts';
import classNames from 'classnames';

function OfferScreen(): JSX.Element {

  const {fetchOfferAction, fetchNearByAction} = useActionCreators(offerActions);
  const {fetchCommentsAction} = useActionCreators(reviewsActions);

  const {id} = useParams();

  useEffect(() => {
    fetchOfferAction(id as string);
    fetchNearByAction(id as string);
    fetchCommentsAction(id as string);
  }, [fetchOfferAction, fetchNearByAction, fetchCommentsAction, id]);

  const currentOffer = useAppSelector(offerSelectors.offer);
  const status = useAppSelector(offerSelectors.status);
  const nearByOffers = useAppSelector(offerSelectors.nearby);
  const reviews = useAppSelector(reviewsSelectors.reviews);
  const isAuth = useAuth();

  if (status === RequestStatus.Failed) {
    return <Page404Screen />;
  }

  if (status === RequestStatus.Loading || currentOffer === null || currentOffer === undefined || id === undefined) {
    return <MemorizedLoading />;
  }

  const {city:{name:activeCity}} = currentOffer;
  const activeCityParams = getActiveCityParams(CITIES, activeCity as CityName);
  const ratingStarsStyle = Math.round(currentOffer.rating) * RATING_MULTIPLIER;
  const upperType = getUpperString(currentOffer.type);
  const nearByOffersList = nearByOffers.slice(0, MaxCountLimit.OfferNearby);
  const nearByOffersMap = currentOffer !== undefined ? [...nearByOffersList, currentOffer] : nearByOffersList;

  return (
    <main className="page__main page__main--offer">
      <section className="offer">
        {<MemorizedOfferGalleries images={currentOffer.images} title={currentOffer.title}/>}

        <div className="offer__container container">
          <div className="offer__wrapper">
            {
              currentOffer.isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              )
            }
            <div className="offer__name-wrapper">
              <h1 className="offer__name">{currentOffer.title}</h1>
              <MemorizedFavoriteButton bemBlock={'offer'} isFavorite={currentOffer.isFavorite} offerId={id} />
            </div>
            <div className="offer__rating rating">
              <div className="offer__stars rating__stars">
                <span style={{'width': `${ratingStarsStyle}%`}}></span>
                <span className="visually-hidden">Rating</span>
              </div>
              <span className="offer__rating-value rating__value">{currentOffer.rating}</span>
            </div>
            <ul className="offer__features">
              <li className="offer__feature offer__feature--entire">{upperType}</li>
              {
                currentOffer.bedrooms !== undefined && (
                  <li className="offer__feature offer__feature--bedrooms">
                    {currentOffer.bedrooms} {getPlural(currentOffer.bedrooms, ['Bedroom', 'Bedrooms', 'Bedrooms'])}
                  </li>
                )
              }
              {
                currentOffer.maxAdults !== undefined && (
                  <li className="offer__feature offer__feature--adults">
                    Max {currentOffer.maxAdults} {getPlural(currentOffer.maxAdults, ['adult', 'adults', 'adults'])}
                  </li>
                )
              }
            </ul>
            <div className="offer__price">
              <b className="offer__price-value">&euro;{currentOffer.price}</b>
              <span className="offer__price-text">&nbsp;night</span>
            </div>
            {<MemorizedOfferGoodsList goods={currentOffer.goods} />}
            <div className="offer__host">
              <h2 className="offer__host-title">Meet the host</h2>
              {
                currentOffer.host !== undefined && (
                  <div className="offer__host-user user">
                    <div className={classNames('offer__avatar-wrapper', 'user__avatar-wrapper', {'offer__avatar-wrapper--pro' : currentOffer.host.isPro})}>
                      <img className="offer__avatar user__avatar" src={currentOffer.host.avatarUrl} width="74" height="74" alt={currentOffer.host.name} />
                    </div>
                    <span className="offer__user-name">{currentOffer.host.name}</span>
                    {currentOffer.isPremium && <span className="offer__user-status">{currentOffer.host.isPro && 'Pro'}</span>}
                  </div>
                )
              }
              <div className="offer__description">{currentOffer.description}</div>
            </div>
            <section className="offer__reviews reviews">
              <MemorizedReviews reviewsListData={reviews} isAuth={isAuth} />
            </section>
          </div>
        </div>
        <Map offers={nearByOffersMap} className={'offer__map map'} selectedPoint={currentOffer} selectedCity={activeCityParams} />
      </section>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">Other places in the neighbourhood</h2>
          <div className="near-places__list places__list">
            <MemorizedOffersList
              offersList={nearByOffersList}
              offersListTemplate="offerScreen"
            />
          </div>
        </section>
      </div>
    </main>
  );
}

export default OfferScreen;
