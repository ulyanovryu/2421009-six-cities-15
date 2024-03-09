import {Ratings, Rating} from '../../types/rating.ts';
import {ratingsList} from '../../mocks/rating.ts';

import RatingElement from '../rating-element';

const reverseRatingsList: Ratings = ratingsList.reverse();

type RatingsProps = {
  setRating: (rating: string) => void;
}

function RatingsList ({setRating}: RatingsProps): JSX.Element[] {
  return (
    reverseRatingsList.map((ratingParams: Rating): JSX.Element => (
      <RatingElement
        key={ratingParams.value}
        ratingParams={ratingParams}
        setRating={(ratingValue) => setRating(ratingValue)}
      />
    ))
  );
}

export default RatingsList;
