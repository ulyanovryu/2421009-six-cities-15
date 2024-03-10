import CitiesOffersList from '../../components/cities-offers-list';

function FavoritesScreen(): JSX.Element {
  return (
    <main className="page__main page__main--favorites">
      <div className="page__favorites-container container">
        <div style={{'display' : 'none'}}></div>
        <section className="favorites">
          <h1 className="favorites__title">Saved listing</h1>
          <CitiesOffersList />
        </section>
      </div>
    </main>
  );
}

export default FavoritesScreen;
