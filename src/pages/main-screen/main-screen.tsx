import {useState} from 'react';

import {Offers} from '../../types/offers.ts';
import {Cities, CityName} from '../../types/cities.ts';

import {getActiveCityParams, plural} from '../../utils/utils.ts';

import {useAppSelector} from '../../hooks';

import CitiesList from '../../components/cities-list';
import OffersList from '../../components/offers-list';
import SortingForm from '../../components/sorting-form';
import Map from '../../components/map';
import {offersSelectors} from '../../store/slices/offers.ts';

import {SortOption} from '../../const.ts';

type MainScreenProps = {
  city: CityName;
  citiesList: Cities;
}

function MainScreen ({city, citiesList}: MainScreenProps): JSX.Element {

  const [activeSort, setActiveSort] = useState(SortOption.Popular);

  const activeCityParams = getActiveCityParams(citiesList, city);
  const offers:Offers = useAppSelector(offersSelectors.offers);

  const offersByCity = Object.groupBy(offers, (offer) => offer.city.name);

  const currentOffersByCity:Offers = offersByCity[city] || [];

  //const [activeOffer, setActiveOffer] = useState<Nullable<Offer>>(null);

  const activeId = useAppSelector(offersSelectors.activeId);
  //const activeOffer = (useAppSelector(offersSelectors.activeOffer)).shift();
  const activeOffer = (offers.filter((offer) => offer.id === activeId)).shift();

  const cityOffersCount = currentOffersByCity.length;

  let sortedOffers = currentOffersByCity;
  if (activeSort === SortOption.PriceLowToHigh) {
    sortedOffers = currentOffersByCity.toSorted((a, b) => a.price - b.price);
  } else if (activeSort === SortOption.PriceHighToLow) {
    sortedOffers = currentOffersByCity.toSorted((a, b) => b.price - a.price);
  } else if (activeSort === SortOption.TopRatedFirst) {
    sortedOffers = [...currentOffersByCity].sort((a, b) => b.rating - a.rating);
  }

  return (
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <CitiesList citiesList={citiesList} />
        </section>
      </div>
      <div className="cities">
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">{cityOffersCount} {plural(cityOffersCount, ['place', 'places', 'places'])} to stay in {city}</b>
            <SortingForm current={activeSort} setter={setActiveSort} />
            <div className="cities__places-list places__list tabs__content">
              <OffersList
                offersList={sortedOffers}
                offersListTemplate="mainScreen"
              />
            </div>
          </section>
          <div className="cities__right-section">
            <Map offers={currentOffersByCity} className={'cities__map map'} selectedPoint={activeOffer} selectedCity={activeCityParams} />
          </div>
        </div>
      </div>
    </main>
  );
}

export default MainScreen;
