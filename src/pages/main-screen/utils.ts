import {SortOption} from '../../const.ts';
import {Offers} from '../../types/offers.ts';

function sortOffers (sort: SortOption, offers: Offers) {
  let sortedOffers = offers;
  if (sort === SortOption.PriceLowToHigh) {
    sortedOffers = offers.toSorted((a, b) => a.price - b.price);
  } else if (sort === SortOption.PriceHighToLow) {
    sortedOffers = offers.toSorted((a, b) => b.price - a.price);
  } else if (sort === SortOption.TopRatedFirst) {
    sortedOffers = [...offers].sort((a, b) => b.rating - a.rating);
  }
  return sortedOffers;
}

export default sortOffers;
