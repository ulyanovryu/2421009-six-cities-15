import CitiesOffersList from '../../components/cities-offers-list';
import {Offers} from '../../types/offers.ts';
import {Cities} from '../../types/cities.ts';

type FavoriteScreenProps = {
  citiesList: Cities;
  offersList: Offers;
}

function FavoritesScreen({citiesList, offersList}: FavoriteScreenProps): JSX.Element {
  return (
    <main className="page__main page__main--favorites">
      <div className="page__favorites-container container">
        <div style={{'display' : 'none'}}></div>
        <section className="favorites">
          <h1 className="favorites__title">Saved listing</h1>
          <CitiesOffersList citiesList={citiesList} offersList={offersList} />
        </section>
      </div>
    </main>
  );
}

export default FavoritesScreen;
