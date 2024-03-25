import {saveToken, dropToken} from '../../services/token';
import {APIRoute} from '../../const';
import {Auth} from '../../types/auth.ts';
import {User} from '../../types/user.ts';

import {createAppAsyncThunk} from '../../hooks';

export const checkAuthAction = createAppAsyncThunk<User, undefined>(
  'user/checkAuth',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<User>(APIRoute.Login);
    return data;
  },
);

export const loginAction = createAppAsyncThunk<User, Auth>(
  'user/login',
  async ({login: email, password}, {extra: api}) => {
    const {data} = await api.post<User>(APIRoute.Login, {email, password});
    const {token} = data;
    if (token !== undefined && token !== null) {
      saveToken(token);
    }
    return data;
  },
);

export const logoutAction = createAppAsyncThunk<void, undefined>(
  'user/logout',
  async (_arg, {extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
  },
);
