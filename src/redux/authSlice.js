/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    login: {
      currentUser: null,
    },
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.login.currentUser = action.payload;
    },
  },
});
export const { loginSuccess } = authSlice.actions;
export default authSlice.reducer;
