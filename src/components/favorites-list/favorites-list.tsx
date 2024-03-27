
import {Offers} from '../../types/offers.ts';
import {Fragment} from 'react';
import {NavLink} from 'react-router-dom';
import OffersList from '../offers-list';
import {CITIES} from '../../const.ts';

type FavoritesListProps = {
  offers : Offers;
}

const getCityId = (cityName: string): string => {
  let id = '';
  for (const city of CITIES) {
    if (city['name'] === cityName) {
      id = city.id;
      break;
    }
  }

  return id;
};

function FavoritesList ({offers}: FavoritesListProps): JSX.Element {

  const offersByCity = Object.groupBy(offers, (offer) => offer.city.name);

  const cities = Object.keys(offersByCity);

  return (
    <ul className="favorites__list">
      {
        cities.map((city): JSX.Element => (
          <Fragment key={city}>
            <li className="favorites__locations-items">
              <div className="favorites__locations locations locations--current">
                <div className="locations__item">
                  <NavLink to={`/${getCityId(city)}`} className={'locations__item-link'}>
                    <span>{city}</span>
                  </NavLink>
                </div>
              </div>
              <div className="favorites__places">
                <OffersList
                  offersList={offersByCity[city] as Offers}
                  offersListTemplate="favoriteScreen"
                />
              </div>
            </li>
          </Fragment>
        ))
      }
    </ul>
  );
}

export default FavoritesList;
