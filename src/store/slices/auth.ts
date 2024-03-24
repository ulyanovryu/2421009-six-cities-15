import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {AuthorizationStatus} from '../../const.ts';

interface AuthorizationState {
  authorizationStatus: AuthorizationStatus;
}

const initialState: AuthorizationState = {
  authorizationStatus: AuthorizationStatus.Unknown
};

const authorizationSlice = createSlice({
  initialState,
  name: 'authorization',
  reducers: {
    setAuthorizationStatus: (state, action: PayloadAction<AuthorizationStatus>) => {
      state.authorizationStatus = action.payload;
    }
  },
  selectors: {
    authorizationStatus: (state:AuthorizationState) => state.authorizationStatus,
  }
});

const authorizationActions = authorizationSlice.actions;

const authorizationSelectors = {
  ...authorizationSlice.selectors,
};

export {authorizationActions, authorizationSlice, authorizationSelectors};
