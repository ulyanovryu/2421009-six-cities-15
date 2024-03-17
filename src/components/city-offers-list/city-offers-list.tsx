import {Link} from 'react-router-dom';

import {Fragment, useState} from 'react';
import {Offer, Offers} from '../../types/offers.ts';
import {City} from '../../types/cities.ts';

import OffersList from '../offers-list';
import {Nullable} from 'vitest';

type CityOffersListParams = {
  city: City;
  offersList: Offers;
};

function CityOffersList ({city, offersList}: CityOffersListParams): JSX.Element {
  const {id, link, name} = city;
  const offersListFiltered = city !== undefined ?
    offersList.filter((offer) => offer.city.name === name) : [];

  const [activeOffer, setActiveOffer] = useState<Nullable<Offer>>(null);

  // eslint-disable-next-line no-console
  console.log(activeOffer);

  return offersListFiltered.length > 0 ? (
    <Fragment key={id}>
      <li className="favorites__locations-items">
        <div className="favorites__locations locations locations--current">
          <div className="locations__item">
            <Link className="locations__item-link" to={link}>
              <span>{name}</span>
            </Link>
          </div>
        </div>
        <div className="favorites__places">
          <OffersList
            offersList={offersListFiltered}
            offersListTemplate="favoriteScreen"
            onMouseOffer={(activeOfferParams) => {
              setActiveOffer(activeOfferParams || null);
            }}
          />
        </div>
      </li>
    </Fragment>
  ) : <> </>;
}

export default CityOffersList;
