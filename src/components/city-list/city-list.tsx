import {NavLink} from 'react-router-dom';
import {City} from '../../types/cities.ts';
import * as classNames from 'classnames';

type CityProps = {
  city: City;
}
function CityList ({city}: CityProps): JSX.Element {
  return (
    <li className="locations__item">
      <NavLink to={`/${city.id}`} className={({isActive}) => classNames(
        'locations__item-link', 'tabs__item', {'tabs__item--active': isActive}
      )}
      >
        <span>{city.name}</span>
      </NavLink>
    </li>
  );
}

export default CityList;
