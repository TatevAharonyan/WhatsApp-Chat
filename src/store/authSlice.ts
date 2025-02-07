/** @format */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  idInstance: string;
  apiTokenInstance: string;
}

const initialState: AuthState = {
  idInstance: "",
  apiTokenInstance: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<AuthState>) => {
      state.idInstance = action.payload.idInstance;
      state.apiTokenInstance = action.payload.apiTokenInstance;
    },
    logout: (state) => {
      state.idInstance = "";
      state.apiTokenInstance = "";
    },
  },
});

export const { setAuth, logout } = authSlice.actions;
export default authSlice.reducer;
