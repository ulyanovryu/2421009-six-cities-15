import {City} from '../../types/cities.ts';

import citiesList from '../../mocks/cities.ts';
import offersList from '../../mocks/offers.ts';

import CityOffersList from '../../components/city-offers-list';
import {Fragment} from 'react';

function CitiesOffersLlist (): JSX.Element {
  return (
    <ul className="favorites__list">
      {
        citiesList.map((city: City): JSX.Element => (
          <Fragment key={city.id}>
            <CityOffersList city={city} offersList={offersList} />
          </Fragment>
        ))
      }
    </ul>
  );
}

export default CitiesOffersLlist;
