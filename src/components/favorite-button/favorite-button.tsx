import {memo, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import classNames from 'classnames';
import {AppRoute} from '../../const.ts';
import {useActionCreators} from '../../hooks';
import {useAuth} from '../../hooks/user-authorization.ts';
import {favoritesActions} from '../../store/slices/favorites.ts';

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
  const navigate = useNavigate();
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
  const isAuth = useAuth();

  const handleClick = () => {
    if (isAuth) {
      changeFavoriteAction({
        offerId,
        status: Number(!favorite)
      });
      setFavorite(!favorite);
    } else {
      navigate(AppRoute.Login);
    }
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

const MemorizedFavoriteButton = memo(FavoriteButton);

export default MemorizedFavoriteButton;
