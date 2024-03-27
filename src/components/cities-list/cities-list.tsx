import {NavLink} from 'react-router-dom';
import {Cities, City} from '../../types/cities.ts';
import * as classNames from 'classnames';

type CitiesOffersListProps = {
  citiesList: Cities;
}

function CitiesList ({citiesList}: CitiesOffersListProps): JSX.Element {
  return (
    <ul className="locations__list tabs__list">
      {citiesList.map((city:City) => (
        <li className="locations__item" key={city.id} >
          <NavLink to={`/${city.id}`} className={({isActive}) => classNames(
            'locations__item-link', 'tabs__item', {'tabs__item--active': isActive}
          )}
          >
            <span>{city.name}</span>
          </NavLink>
        </li>
      ))}
    </ul>
  );
}

export default CitiesList;
