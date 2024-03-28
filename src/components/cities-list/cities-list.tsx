import {Cities, City} from '../../types/cities.ts';
import CityList from '../city-list';

type CitiesOffersListProps = {
  citiesList: Cities;
}
function CitiesList ({citiesList}: CitiesOffersListProps): JSX.Element {
  return (
    <ul className="locations__list tabs__list">
      {citiesList.map((city:City) => (
        <CityList city={city} key={city.id} />
      ))}
    </ul>
  );
}

export default CitiesList;
