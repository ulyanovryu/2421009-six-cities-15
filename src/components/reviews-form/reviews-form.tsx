import {ChangeEvent, Fragment, memo, ReactEventHandler, useState} from 'react';

import {Ratings, Rating} from '../../types/rating.ts';
import {useActionCreators, useAppSelector} from '../../hooks';
import {reviewsActions, reviewsSelectors} from '../../store/slices/reviews.ts';
import {offerSelectors} from '../../store/slices/offer.ts';
import {RequestStatus} from '../../const.ts';

type THandleFormChange = ReactEventHandler<HTMLInputElement | HTMLTextAreaElement>;
type ReviewsFormProps = {
  ratingsList: Ratings;
}

function ReviewsForm ({ratingsList}:ReviewsFormProps): JSX.Element {

  const currentOffer = useAppSelector(offerSelectors.offer);
  const reviewStatus = useAppSelector(reviewsSelectors.status);
  const {addCommentAction} = useActionCreators(reviewsActions);
  const initialState = {rating: 0, review: ''};
  const [review, setReview] = useState(initialState);
  const handleFormChange: THandleFormChange = (event) => {
    const {name, value} = event.currentTarget;
    setReview({...review, [name]:value});
  };

  if (currentOffer === null || currentOffer === undefined) {
    return <>&nbsp;</>;
  }

  const handleCommentFormSubmit = (evt: ChangeEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (reviewStatus !== RequestStatus.Loading) {
      addCommentAction({body:{comment: review.review, rating: parseInt(String(review.rating), 10)}, offerId: currentOffer.id});
    }
    if (reviewStatus === RequestStatus.Success) {
      setReview(initialState);
      evt.currentTarget.reset();
    }
  };

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleCommentFormSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {ratingsList.map(({value, title}: Rating) => (
          <Fragment key={value}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={value}
              id={`${value}-stars`}
              checked={value === Number(review.rating)}
              type="radio"
              disabled={reviewStatus === RequestStatus.Loading}
              onChange={handleFormChange}
            />
            <label htmlFor={`${value}-stars`} className="reviews__rating-label form__rating-label" title={title}>
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </Fragment>
        ))}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        value={review.review}
        disabled={reviewStatus === RequestStatus.Loading}
        placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={handleFormChange}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and
          describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={review.review.length < 50 || review.review.length > 300 || review.rating === 0 || reviewStatus === RequestStatus.Loading}
        >Submit
        </button>
      </div>
    </form>
  );
}

const MemorizedReviewsForm = memo(ReviewsForm);

export default MemorizedReviewsForm;
