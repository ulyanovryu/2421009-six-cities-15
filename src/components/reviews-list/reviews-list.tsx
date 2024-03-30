import {Review, ReviewsType} from '../../types/reviews.ts';

import ReviewList from '../review-list';
import {memo} from 'react';

type ReviewsProps = {
  reviews: ReviewsType;
}

function ReviewsList ({reviews}: ReviewsProps): JSX.Element {
  return (
    <ul className="reviews__list">
      {
        reviews.map((review: Review) => (
          <ReviewList key={review.id} review={review} />
        ))
      }
    </ul>
  );
}

export default memo(ReviewsList);
