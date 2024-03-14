import {Fragment, ReactEventHandler, useState} from 'react';

import {Ratings, Rating} from '../../types/rating.ts';

type THandleFormChange = ReactEventHandler<HTMLInputElement | HTMLTextAreaElement>;
type ReviewsFormProps = {
  ratingsList: Ratings;
}

function ReviewsForm ({ratingsList}:ReviewsFormProps): JSX.Element {

  const [review, setReview] = useState({rating: 0, review: ''});
  const handleFormChange: THandleFormChange = (event) => {
    const {name, value} = event.currentTarget;
    setReview({...review, [name]:value});
  };

  return (
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {ratingsList.map(({value, title}: Rating) => (
          <Fragment key={value}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={value}
              id={`${value}-stars`}
              type="radio"
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
          disabled={review.review.length < 50 || review.rating === 0}
        >Submit
        </button>
      </div>
    </form>
  );
}

export default ReviewsForm;
