import {Review, ReviewsType} from '../../types/reviews.ts';
import {Ratings} from '../../types/rating.ts';

import ReviewsForm from '../reviews-form';
import ReviewsList from '../reviews-list';

type ReviewsProps = {
  offerId: string;
  isAuth: boolean;
  reviewsListData: ReviewsType;
  ratingsList: Ratings;
}

function Reviews ({offerId, isAuth, reviewsListData, ratingsList}: ReviewsProps):JSX.Element {

  const reviews: ReviewsType = reviewsListData.filter((review: Review) => review.id === offerId);
  const reviewsAmount = reviews.length;

  return (
    <>
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviewsAmount}</span></h2>
      <ReviewsList reviews={reviews} />
      {isAuth && <ReviewsForm ratingsList={ratingsList} />}
    </>
  );
}

export default Reviews;
