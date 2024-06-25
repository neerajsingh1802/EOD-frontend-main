import { configureStore } from "@reduxjs/toolkit";
import appStateSlice from "./features/appStateSlice";
import createProposalSlice from "./proposals/reducer";
import authSlice from './auth/reducer'

export const REDUCER_TYPES = {
  AUTH: 'auth',
}

export const store = configureStore({
  reducer: {
    auth: authSlice,
    appState: appStateSlice,
    proposals: createProposalSlice,

  }
});