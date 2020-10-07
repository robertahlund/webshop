import axios from "axios";
import { AppThunk } from "../store/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAuth } from "../types/types";

const initialState: IAuth = {
  userId: null,
  roles: [],
  initialLoad: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    login(state, action: PayloadAction<IAuth>) {
      state.userId = action.payload.userId;
      state.roles = action.payload.roles;
      state.initialLoad = true;
    },
    logout(state) {
      state.userId = null;
      state.roles = [];
      state.initialLoad = true;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;

export const validateUserSession = (): AppThunk => async (dispatch) => {
  try {
    const response = await axios.get("/api/auth/status");
    const user: IAuth = {
      userId: response.data.userId,
      roles: response.data.roles,
      initialLoad: true,
    };
    dispatch(login(user));
  } catch (error) {
    console.log(error.response.data.message);
    dispatch(logout());
  }
};
