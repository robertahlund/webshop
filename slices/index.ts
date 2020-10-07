import { combineReducers } from "redux";

import cartReducer from "./cartSlice";
import authReducer from "./authSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
