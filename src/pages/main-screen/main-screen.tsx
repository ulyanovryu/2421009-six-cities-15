import {Offers} from '../../types/offers.ts';
import {Cities, City} from '../../types/cities.ts';

import SortingForm from '../../components/sorting-form';
import OffersList from '../../components/offers-list';
import Map from '../../components/map';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../const.ts';
import {SortingsList} from '../../types/sorting.ts';

type MainScreenProps = {
  citiesList: Cities;
  offersCount: number;
  offersList: Offers;
  sortingsList: SortingsList;
}

function MainScreen ({citiesList, offersCount, offersList, sortingsList}: MainScreenProps): JSX.Element {
  return (
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list">
            {citiesList.map((city: City) => (
              <li className="locations__item" key={city.id}>
                <Link className="locations__item-link tabs__item" to={AppRoute.Root}>
                  <span>{city.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
      <div className="cities">
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">{offersCount} places to stay in Amsterdam</b>
            <SortingForm sortingsList={sortingsList} />
            <div className="cities__places-list places__list tabs__content">
              <OffersList offersList={offersList} offersListTemplate="mainScreen" />
            </div>
          </section>
          <div className="cities__right-section">
            <section className="cities__map map"></section>
          </div>
        </div>
      </div>
    </main>
  );
}

export default MainScreen;
