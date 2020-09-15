import { combineReducers } from "redux";

import cartReducer from "./cartReducer";
import authReducer from "./authReducer";

const rootReducer = combineReducers({
  authReducer,
  cartReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
