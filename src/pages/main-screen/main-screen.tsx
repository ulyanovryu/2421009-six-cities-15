import {useState} from 'react';
import {Nullable} from 'vitest';

import {Offer, Offers} from '../../types/offers.ts';
import {Cities, City} from '../../types/cities.ts';
import {SortingsList} from '../../types/sorting.ts';

import {plural} from '../../utils/utils.ts';

import {changeOffers} from '../../store/action.ts';
import {useAppDispatch} from '../../hooks';

import CitiesList from '../../components/cities-list';
import OffersList from '../../components/offers-list';
import SortingForm from '../../components/sorting-form';
import Map from '../../components/map';

type MainScreenProps = {
  citiesList: Cities;
  offersCount: number;
  offersList: Offers;
  sortingsList: SortingsList;
}

function MainScreen ({citiesList, offersCount, offersList, sortingsList}: MainScreenProps): JSX.Element {

  const initialCity: City = citiesList[0];
  const [activeOffer, setActiveOffer] = useState<Nullable<Offer>>(null);
  const [activeCity, setActiveCity] = useState<City> (initialCity);

  const cityOffersList: Offers = offersList.filter((offer: Offer) => offer.city.name === activeCity.name);
  const cityOffersCount = cityOffersList.length ? cityOffersList.length : offersCount;

  const dispatch = useAppDispatch();

  dispatch(changeOffers({offers:cityOffersList}));

  return (
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <CitiesList citiesList={citiesList} initialCity={initialCity} getClickActiveCity={(activeCityParams) => {
            setActiveCity(activeCityParams);
          }}
          />
        </section>
      </div>
      <div className="cities">
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">{cityOffersCount} {plural(cityOffersCount, ['place', 'places', 'places'])} to stay in {activeCity.name}</b>
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
