import {SortingsList} from '../../types/sorting.ts';

type SortingProps = {
  sortingsList: SortingsList;
}

function SortingForm ({sortingsList}: SortingProps): JSX.Element {
  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0}>
        Popular
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className="places__options places__options--custom places__options--opened">
        {sortingsList.map((sortingVariant) => (
          <li className="places__option" key={sortingVariant.id} tabIndex={0}>
            {sortingVariant.name}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default SortingForm;
