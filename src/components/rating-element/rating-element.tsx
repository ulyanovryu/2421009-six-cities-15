import {Rating} from '../../types/rating.ts';

type RatingProps = {
  ratingParams: Rating;
  setRating: (rating: string) => void;
}
function RatingElement ({ratingParams, setRating}: RatingProps):JSX.Element {
  return (
    <>
      <input
        className="form__rating-input visually-hidden"
        name="rating"
        value={ratingParams.value}
        id={`${ratingParams.value}-stars`}
        type="radio"
        onChange = {(e) => setRating(e.target.defaultValue)}
      />
      <label htmlFor={`${ratingParams.value}-stars`} className="reviews__rating-label form__rating-label" title={ratingParams.title}>
        <svg className="form__star-image" width="37" height="33">
          <use xlinkHref="#icon-star"></use>
        </svg>
      </label>
    </>
  );
}

export default RatingElement;
