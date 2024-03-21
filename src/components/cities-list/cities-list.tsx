// import {ReactEventHandler, useState} from 'react';
import {NavLink} from 'react-router-dom';
//import {Cities, City} from '../../types/cities.ts';
// import {useActionCreators} from '../../hooks';
// import {AppRoute} from '../../const.ts';
// import {offersActions} from '../../store/slices/offers.ts';
import {Cities, City} from '../../types/cities.ts';
import * as classNames from 'classnames';

type CitiesOffersListProps = {
  citiesList: Cities;
  // initialCity: CityName;
}

// type THandleClick = ReactEventHandler;


function CitiesList ({citiesList}: CitiesOffersListProps): JSX.Element {

  // const [activeCity, setActiveCity] = useState<CityName> (initialCity);
  // const {setCity} = useActionCreators(offersActions);
  //
  // const handleClick:THandleClick = (evt) => {
  //   const selectedCity: CityName = evt.currentTarget.children[0].innerHTML as CityName;
  //   setActiveCity(selectedCity);
  //   setCity(selectedCity);
  // };

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
