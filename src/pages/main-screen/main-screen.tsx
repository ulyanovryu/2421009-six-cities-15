import OfferList from '../../components/offer-list';
import SortingForm from '../../components/sorting-form';
import CitiesList from '../../mocks/cities-list.ts';
import OffersList from '../../mocks/offers-list.ts';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../const.ts';

type MainScreenProps = {
  offersCount: number;
}

function MainScreen ({offersCount}: MainScreenProps): JSX.Element {
  return (
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list">
            {CitiesList.map((city) => (
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
            <SortingForm />
            <div className="cities__places-list places__list tabs__content">
              {OffersList.map((offer) => (
                <OfferList
                  key={offer.id}
                  id={offer.id}
                  isPremium={offer.isPremium}
                  isFavorite={offer.isFavorite}
                  title={offer.title}
                  price={offer.price}
                  rating={offer.rating}
                  type={offer.type}
                  previewImage={offer.previewImage}
                  city={offer.city}
                  location={offer.location}
                />
              ))}
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
