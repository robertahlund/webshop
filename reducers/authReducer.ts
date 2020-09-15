import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAuth } from "../types/types";

const initialState: IAuth = {
  userId: null,
  roles: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    login(state, action: PayloadAction<IAuth>) {
      state.userId = action.payload.userId;
      state.roles = action.payload.roles;
    },
    logout(state, action: PayloadAction<IAuth>) {
      state.userId = null;
      state.roles = [];
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
