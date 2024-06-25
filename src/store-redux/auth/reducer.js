import { createSlice } from "@reduxjs/toolkit";
import ACTIONS from "./action-types";

const initialState = {
  loggedInUser: null,
  isLoggedIn: false,
  accountCreation: null,
  appCookie: "",
  accountType: null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    [ACTIONS.LOGOUT]: (state) => {
      state.isLoggedIn = false;
    },
    [ACTIONS.LOGIN]: (state, { payload }) => {
      state.isLoggedIn = true;
      state.loggedInUser = payload

    },
    [ACTIONS.REGISTER]: (state, { payload }) => {
      state.isLoggedIn = true;
      state.accountCreation = payload;
    },
    [ACTIONS.SET_COOKIE]: (state, { payload }) => {
      state.isLoggedIn = true;
      state.appCookie = payload;
    },
    [ACTIONS.CURRENT_ORGANIZATION]: (state, { payload }) => {
      state.organizationId = payload;
    },
    [ACTIONS.CREATE_PASSWORD]: (state, { payload }) => {
      state.loggedInUser = payload
    },
    [ACTIONS.SET_ACCOUNT_TYPE]: (state, { payload }) => {
      state.accountType = payload
    },
  },
});
export const REDUCER = authSlice.actions;

export default authSlice.reducer;
