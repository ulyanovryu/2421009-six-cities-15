import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {AuthorizationStatus} from '../../const.ts';
import {User} from '../../types/user.ts';

interface AuthorizationState {
  authorizationStatus: AuthorizationStatus;
  user: User;
}

const initialState: AuthorizationState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  user: {
    'name' : '',
    'email' : '',
    'avatarUrl' : '',
    'isPro' : false,
    'token' : '',
  }
};

const authorizationSlice = createSlice({
  initialState,
  name: 'authorization',
  reducers: {
    setAuthorizationStatus: (state, action: PayloadAction<AuthorizationStatus>) => {
      state.authorizationStatus = action.payload;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    }
  },
  selectors: {
    authorizationStatus: (state:AuthorizationState) => state.authorizationStatus,
    user: (state:AuthorizationState) => state.user,
  }
});

const authorizationActions = authorizationSlice.actions;

const authorizationSelectors = {
  ...authorizationSlice.selectors,
};

export {authorizationActions, authorizationSlice, authorizationSelectors};
