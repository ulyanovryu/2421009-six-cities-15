import {useAppSelector} from './index.ts';
import {userSelectors} from '../store/slices/user.ts';
import {AuthorizationStatus} from '../const.ts';

export function useAuth (): boolean {
  const status = useAppSelector(userSelectors.status);
  return status === AuthorizationStatus.Auth;
}
