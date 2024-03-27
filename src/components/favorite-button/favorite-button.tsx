import classNames from 'classnames';
import {useActionCreators} from '../../hooks';
import {favoritesActions} from '../../store/slices/favorites.ts';
import {useState} from 'react';


type FavoriteButtonProps = {
  bemBlock?: 'offer' | 'place-card';
  isFavorite?: boolean;
  offerId: string;
  width: number;
}

const enum Default {
  HeightCoefficient = 18 / 17
}

function FavoriteButton ({bemBlock = 'place-card', isFavorite = false, offerId, width = 18}: FavoriteButtonProps): JSX.Element {

  const [favorite, setFavorite] = useState(isFavorite);

  const favoriteLabel = `${favorite ? 'In' : 'To'} bookmaks`;
  const buttonClass = `${bemBlock}__bookmark-button`;
  const favoriteClass = classNames(
    buttonClass, {
      [`${buttonClass}--active`]: favorite
    },
    'button'
  );

  const height = width * Default.HeightCoefficient;
  const {changeFavoriteAction} = useActionCreators(favoritesActions);

  const handleClick = () => {
    changeFavoriteAction({
      offerId,
      status: Number(!favorite)
    });
    setFavorite(!favorite);
  };

  return (
    <button className={favoriteClass} onClick={handleClick} type="button">
      <svg className={`${bemBlock}__bookmark-icon`} width={width} height={height}>
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">{favoriteLabel}</span>
    </button>
  );
}

export default FavoriteButton;
