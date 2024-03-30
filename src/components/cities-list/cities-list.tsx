import {City} from '../../types/cities.ts';
import CityList from '../city-list';
import {CITIES} from '../../const.ts';
import {memo} from 'react';


function CitiesList (): JSX.Element {
  return (
    <ul className="locations__list tabs__list">
      {CITIES.map((city:City) => (
        <CityList city={city} key={city.id} />
      ))}
    </ul>
  );
}

export default memo(CitiesList);
