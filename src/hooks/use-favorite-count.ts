import {useEffect} from 'react';

import {RequestStatus} from '../const.ts';

import {useActionCreators, useAppSelector} from './index.ts';
import {favoritesActions, favoritesSelectors} from '../store/slices/favorites.ts';

function useFavoriteCount () {
  const status = useAppSelector(favoritesSelectors.status);
  const count = useAppSelector(favoritesSelectors.favorites).length;
  const {fetchFavoritesAction} = useActionCreators(favoritesActions);

  useEffect(() => {
    if (status === RequestStatus.Idle) {
      fetchFavoritesAction();
    }
  }, [status, fetchFavoritesAction, ]);

  return count;
}

export {useFavoriteCount};
