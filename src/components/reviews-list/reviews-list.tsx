import {Review, ReviewsType} from '../../types/reviews.ts';

import MemorizedReviewList from '../review-list';
import {memo} from 'react';

type ReviewsProps = {
  reviews: ReviewsType;
}

function ReviewsList ({reviews}: ReviewsProps): JSX.Element {
  return (
    <ul className="reviews__list">
      {
        reviews.map((review: Review) => (
          <MemorizedReviewList key={review.id} review={review} />
        ))
      }
    </ul>
  );
}

const MemorizedReviewsList = memo(ReviewsList);

export default MemorizedReviewsList;
