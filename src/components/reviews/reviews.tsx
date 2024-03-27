import {ReviewsType} from '../../types/reviews.ts';
import {Ratings} from '../../types/rating.ts';

import ReviewsForm from '../reviews-form';
import ReviewsList from '../reviews-list';

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
          <ReviewsList reviews={reviewsListData}/>
        </>}

      {isAuth && <ReviewsForm ratingsList={ratingsList}/>}
    </>
  );
}

export default Reviews;
