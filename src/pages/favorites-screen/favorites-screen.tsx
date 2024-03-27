import {useAppSelector} from '../../hooks';
import {favoritesSelectors} from '../../store/slices/favorites.ts';

import FavoritesList from '../../components/favorites-list';
import classNames from 'classnames';

function FavoritesScreen(): JSX.Element {

  const favorites = useAppSelector(favoritesSelectors.favorites);
  const hasFavorites: boolean = favorites.length > 0;

  return (
    <main className={classNames('page__main page__main--favorites', {'page__main--favorites-empty' : !hasFavorites})}>
      <div className="page__favorites-container container">
        {
          hasFavorites ?
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <FavoritesList offers={favorites} />
            </section>
            :
            <section className="favorites favorites--empty">
              <h1 className="visually-hidden">Favorites (empty)</h1>
              <div className="favorites__status-wrapper">
                <b className="favorites__status">Nothing yet saved.</b>
                <p className="favorites__status-description">Save properties to narrow down search or plan your future trips.</p>
              </div>
            </section>
        }
      </div>
    </main>
  );
}

export default FavoritesScreen;
