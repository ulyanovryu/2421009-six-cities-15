import {Fragment} from 'react';
import {NavLink} from 'react-router-dom';

import {Offers} from '../../types/offers.ts';
import {Cities, City} from '../../types/cities.ts';

import OffersList from '../offers-list';
import {getActiveCityParams} from '../../utils/utils.ts';

type CityOffersListParams = {
  citiesList: Cities;
  city: City;
  offersList: Offers;
};

function CityOffersList ({citiesList, city, offersList}: CityOffersListParams): JSX.Element {

  const activeCityParams = getActiveCityParams(citiesList, city.name);

  const offersByCity = Object.groupBy(offersList, (offer) => offer.city.name);

  const currentOffersByCity:Offers = offersByCity[city.name] || [];

  return currentOffersByCity.length > 0 ? (
    <Fragment key={activeCityParams.id}>
      <li className="favorites__locations-items">
        <div className="favorites__locations locations locations--current">
          <div className="locations__item">
            <NavLink to={`/${activeCityParams.id}`} className={'locations__item-link'}>
              <span>{city.name}</span>
            </NavLink>
          </div>
        </div>
        <div className="favorites__places">
          <OffersList
            offersList={currentOffersByCity}
            offersListTemplate="favoriteScreen"
          />
        </div>
      </li>
    </Fragment>
  ) : <> </>;
}

export default CityOffersList;
