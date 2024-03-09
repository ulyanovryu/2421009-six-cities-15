import {useState} from 'react';

import RatingsList from '../ratings-list';

function ReviewsForm (): JSX.Element {

  const [rating, setRating] = useState('5');
  const [description, setDescription] = useState('');

  const onSendForm = () => {
    setRating(rating);
    setDescription(description);
  };

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={onSendForm}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        <RatingsList setRating={(ratingValue) => setRating(ratingValue)} />
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        value={description}
        placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={(e) => setDescription(e.target.value)}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and
          describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled>Submit</button>
      </div>
    </form>
  );
}

export default ReviewsForm;
