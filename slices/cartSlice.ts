import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICartItem } from "../types/types";

const initialState: ICartItem[] = [];

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addItem(state, action: PayloadAction<ICartItem>) {
      state.push(action.payload);
    },
    removeItem(state, action: PayloadAction<ICartItem>) {
      const cartItemIndex = state.findIndex(
        (cartItem) => cartItem.guid === action.payload.guid
      );
      if (cartItemIndex > -1) {
        state.splice(cartItemIndex, 1);
      }
    },
  },
});

export const { addItem, removeItem } = cartSlice.actions;

export default cartSlice.reducer;
