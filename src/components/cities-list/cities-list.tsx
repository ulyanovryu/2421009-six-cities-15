import {ReactEventHandler, useState} from 'react';
import {Link} from 'react-router-dom';
import {Cities, City} from '../../types/cities.ts';
import {useAppDispatch} from '../../hooks';
import {AppRoute} from '../../const.ts';
import {changeCity} from '../../store/action.ts';

type CitiesOffersListProps = {
  citiesList: Cities;
  initialCity: City;
  getClickActiveCity: (city: City) => void;
}

type THandleClick = ReactEventHandler;

function CitiesList ({citiesList, initialCity, getClickActiveCity}: CitiesOffersListProps): JSX.Element {

  const [activeCity, setActiveCity] = useState<City> (initialCity);

  const dispatch = useAppDispatch();

  const handleClick:THandleClick = (evt) => {
    let selectedCity = (citiesList.filter((city: City) => city.name === evt.currentTarget.children[0].innerHTML)).shift();
    selectedCity = selectedCity !== undefined && selectedCity !== null ? selectedCity : initialCity;
    getClickActiveCity(selectedCity);
    setActiveCity(selectedCity);

    dispatch(changeCity({city:selectedCity}));
  };

  const cityClass = (city: City, selectedCity: City): string => {
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

  return (
    <ul className="locations__list tabs__list">
      {citiesList.map((city: City) => (
        <li className="locations__item" key={city.id} >
          <Link className={`locations__item-link tabs__item ${cityClass(city, activeCity)}`} to={AppRoute.Root} onClick={handleClick}>
            <span>{city.name}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default CitiesList;
