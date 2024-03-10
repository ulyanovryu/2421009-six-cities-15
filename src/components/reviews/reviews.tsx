import {Review, ReviewsType} from '../../types/reviews.ts';

import reviewsListData from '../../mocks/reviews.ts';

import ReviewsForm from '../reviews-form';
import ReviewsList from '../reviews-list';

type ReviewsProps = {
  offerId: string;
  isAuth: boolean;
}

function Reviews ({offerId, isAuth}: ReviewsProps):JSX.Element {

  const reviews: ReviewsType = reviewsListData.filter((review: Review) => review.id === offerId);
  const reviewsAmount = reviews.length;

  return (
    <>
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviewsAmount}</span></h2>
      <ReviewsList reviews={reviews} />
      {isAuth && <ReviewsForm />}
    </>
  );
}

export default Reviews;
