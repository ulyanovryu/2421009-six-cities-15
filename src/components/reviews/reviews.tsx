import {ReviewsType} from '../../types/reviews.ts';
import {Ratings} from '../../types/rating.ts';

import MemorizedReviewsForm from '../reviews-form';
import MemorizedReviewsList from '../reviews-list';
import {memo} from 'react';

type ReviewsProps = {
  isAuth: boolean;
  reviewsListData: ReviewsType;
  ratingsList: Ratings;
}

function Reviews ({isAuth, reviewsListData, ratingsList}: ReviewsProps):JSX.Element {

  const reviewsAmount = reviewsListData.length;

  return (
    <>
      {(reviewsAmount > 0) &&
        <>
          <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviewsAmount}</span></h2>
          <MemorizedReviewsList reviews={reviewsListData}/>
        </>}

      {isAuth && <MemorizedReviewsForm ratingsList={ratingsList}/>}
    </>
  );
}

const MemorizedReviews = memo(Reviews);

export default MemorizedReviews;
