import { RootState } from "./../reducers/index";
import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import rootReducer from "../reducers/index";

const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export default store;
