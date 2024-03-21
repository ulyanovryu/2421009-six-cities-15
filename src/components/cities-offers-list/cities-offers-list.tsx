import {Cities, City} from '../../types/cities.ts';

import CityOffersList from '../../components/city-offers-list';
import {Fragment} from 'react';
import {Offers} from '../../types/offers.ts';

type CitiesOffersListProps = {
  citiesList: Cities;
  offersList: Offers;
}

function CitiesOffersList ({citiesList, offersList}: CitiesOffersListProps): JSX.Element {
  return (
    <ul className="favorites__list">
      {
        citiesList.map((city: City): JSX.Element => (
          <Fragment key={city.id}>
            <CityOffersList citiesList={citiesList} city={city} offersList={offersList} />
          </Fragment>
        ))
      }
    </ul>
  );
}

export default CitiesOffersList;
