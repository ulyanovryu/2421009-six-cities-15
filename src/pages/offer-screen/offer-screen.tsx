import {useParams} from 'react-router-dom';

import {AuthorizationStatus} from '../../const.ts';
import {Offers, Offer} from '../../types/offers.ts';
import {ReviewsType} from '../../types/reviews.ts';

import getAuthorizationStatus, {upperString} from '../../utils/utils.ts';
import Page404Screen from '../page404-screen';
import Reviews from '../../components/reviews';
import OffersList from '../../components/offers-list';
import {Ratings} from '../../types/rating.ts';
import Map from '../../components/map';
import {useState} from 'react';
import {Nullable} from 'vitest';
import {Cities, City} from '../../types/cities.ts';

type OfferGalleryImagesType = {
  src: string;
  alt: string;
}

type GoogsType = {
  good: string;
}

function OfferGallery ({src, alt}: OfferGalleryImagesType): JSX.Element {
  return (
    <div className="offer__image-wrapper">
      <img className="offer__image" src={src} alt={alt} />
    </div>
  );
}

function GoogListItem ({good}:GoogsType): JSX.Element {
  return (
    <li className="offer__inside-item">
      {good}
    </li>
  );
}

type OfferScreenProps = {
  citiesList: Cities;
  offersList: Offers;
  reviewsList: ReviewsType;
  ratingsList: Ratings;
};

const getCurrentOfferCity = (offer:Offer, cities: Cities): City => {
  let offerCity = null;

  cities.map((city) => {
    if (city.name === offer.city.name) {
      offerCity = city;
    }
  });

  if (offerCity === null || offerCity === undefined) {
    offerCity = cities[0];
  }

  return offerCity;
};

function OfferScreen({citiesList, offersList, reviewsList, ratingsList}: OfferScreenProps): JSX.Element {

  const [activeOffer, setActiveOffer] = useState<Nullable<Offer>>(null);

  const authorizationStatus = getAuthorizationStatus();
  const {id} = useParams();
  const currentOffer: Offer | undefined = offersList.find((offer: Offer) => offer.id === id);
  const isAuth = authorizationStatus === AuthorizationStatus.Auth;

  if (currentOffer === null || currentOffer === undefined || id === undefined) {
    return <Page404Screen />;
  }
  const activeOfferCity = getCurrentOfferCity(currentOffer, citiesList);

  const ratingStarsStyle = currentOffer.rating * 20;
  const upperType = upperString(currentOffer.type);

  return (
    <main className="page__main page__main--offer">
      <section className="offer">
        {
          currentOffer.images !== undefined ?
            <div className="offer__gallery-container container">
              <div className="offer__gallery">
                {currentOffer.images.map((image) => (
                  <OfferGallery key={image} src={image} alt={currentOffer.title} />
                ))}
              </div>
            </div>
            : null
        }
        <div className="offer__container container">
          <div className="offer__wrapper">
            {
              currentOffer.isPremium ?
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
                : null
            }
            <div className="offer__name-wrapper">
              <h1 className="offer__name">{currentOffer.title}</h1>
              <button className="offer__bookmark-button button" type="button">
                <svg className="offer__bookmark-icon" width="31" height="33">
                  <use xlinkHref="#icon-bookmark"></use>
                </svg>
                <span className="visually-hidden">To bookmarks</span>
              </button>
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
                currentOffer.bedrooms !== undefined ?
                  <li className="offer__feature offer__feature--bedrooms">
                    {currentOffer.bedrooms} Bedrooms
                  </li>
                  : null
              }
              {
                currentOffer.maxAdults !== undefined ?
                  <li className="offer__feature offer__feature--adults">
                    Max {currentOffer.maxAdults} adults
                  </li>
                  : null
              }
            </ul>
            <div className="offer__price">
              <b className="offer__price-value">&euro;{currentOffer.price}</b>
              <span className="offer__price-text">&nbsp;night</span>
            </div>
            {
              currentOffer.goods !== undefined && currentOffer.goods.length > 0 ?
                <div className="offer__inside">
                  <h2 className="offer__inside-title">What&apos;s inside</h2>
                  <ul className="offer__inside-list">
                    {
                      currentOffer.goods.map((good) => (
                        <GoogListItem good={good} key={good} />
                      ))
                    }
                  </ul>
                </div>
                : null
            }
            <div className="offer__host">
              <h2 className="offer__host-title">Meet the host</h2>
              {
                currentOffer.host !== undefined ?
                  <div className="offer__host-user user">
                    <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                      <img className="offer__avatar user__avatar" src={currentOffer.host.avatarUrl} width="74" height="74" alt={currentOffer.host.name} />
                    </div>
                    <span className="offer__user-name">{currentOffer.host.name}</span>
                    <span className="offer__user-status">{currentOffer.host.isPro ? 'Pro' : null}</span>
                  </div>
                  : null
              }
              <div className="offer__description">{currentOffer.description}</div>
            </div>
            <section className="offer__reviews reviews">
              <Reviews reviewsListData={reviewsList} offerId={id} isAuth={isAuth} ratingsList={ratingsList} />
            </section>
          </div>
        </div>
        <Map offers={offersList.slice(0,3)} className={'offer__map map'} selectedPoint={activeOffer} selectedCity={activeOfferCity} />
      </section>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">Other places in the neighbourhood</h2>
          <div className="near-places__list places__list">
            <OffersList
              offersList={offersList.slice(0,3)}
              offersListTemplate="offerScreen"
              getMouseOverOfferList={(activeOfferParams) => {
                setActiveOffer(activeOfferParams || null);
              }}
            />
          </div>
        </section>
      </div>
    </main>
  );
}

export default OfferScreen;
