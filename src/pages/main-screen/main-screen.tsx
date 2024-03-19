import {Offer, Offers} from '../../types/offers.ts';
import {Cities, City} from '../../types/cities.ts';

import SortingForm from '../../components/sorting-form';
import OffersList from '../../components/offers-list';
import Map from '../../components/map';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../const.ts';
import {SortingsList} from '../../types/sorting.ts';
import {ReactEventHandler, useState} from 'react';
import {Nullable} from 'vitest';

type MainScreenProps = {
  citiesList: Cities;
  offersCount: number;
  offersList: Offers;
  sortingsList: SortingsList;
}

type THandleClick = ReactEventHandler;

function MainScreen ({citiesList, offersCount, offersList, sortingsList}: MainScreenProps): JSX.Element {

  const initialCity: City = citiesList[0];
  const [activeOffer, setActiveOffer] = useState<Nullable<Offer>>(null);
  const [activeCity, setActiveCity] = useState<City> (initialCity);

  const handleClick:THandleClick = (evt) => {
    let selectedCity = (citiesList.filter((city: City) => city.name === evt.currentTarget.children[0].innerHTML)).shift();
    selectedCity = selectedCity !== undefined ? selectedCity : initialCity;
    setActiveCity(selectedCity);
  };

  const cityClass = (city: City, selectedCity: City | null | undefined): string => {
    let className = '';
    if (selectedCity === undefined || selectedCity === null) {
      if (city.name === 'Paris') {
        className = 'tabs__item--active';
      }
    } else if (city.name === selectedCity.name) {
      className = 'tabs__item--active';
    }
    return className;
  };

  const cityOffersList: Offers = offersList.filter((offer: Offer) => offer.city.name === activeCity.name);
  const cityOffersCount = cityOffersList.length ? cityOffersList.length : offersCount;

  return (
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list">
            {citiesList.map((city: City) => (
              <li className="locations__item" key={city.id} >
                <Link className={`locations__item-link tabs__item ${cityClass(city, activeCity)}`} to={AppRoute.Root} onClick={handleClick}>
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
            <b className="places__found">{cityOffersCount} places to stay in {activeCity.name}</b>
            <SortingForm sortingsList={sortingsList} />
            <div className="cities__places-list places__list tabs__content">
              <OffersList
                offersList={cityOffersList}
                offersListTemplate="mainScreen"
                getMouseOverOfferList={(activeOfferParams) => {
                  setActiveOffer(activeOfferParams);
                }}
              />
            </div>
          </section>
          <div className="cities__right-section">
            <Map offers={cityOffersList} className={'cities__map map'} selectedPoint={activeOffer} selectedCity={activeCity} />
          </div>
        </div>
      </div>
    </main>
  );
}

export default MainScreen;
