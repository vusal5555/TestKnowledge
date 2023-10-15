import { createSlice } from "@reduxjs/toolkit";
import updateState from "../utils/updateCart";

const initialState = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : { cartItems: [], shippingAddress: {}, paymentMethod: "PayPal" };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;

      const itemExist = state.cartItems.find(
        (cartItem) => cartItem._id === item._id
      );

      if (itemExist) {
        state.cartItems = state.cartItems.map((cartItem) =>
          cartItem._id === itemExist._id ? item : cartItem
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      return updateState(state);
    },
    removeItemFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload
      );

      return updateState(state);
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      return updateState(state);
    },

    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      return updateState(state);
    },

    clearCartItems: (state, action) => {
      state.cartItems = [];
      return updateState(state);
    },
  },
});

export const {
  addToCart,
  removeItemFromCart,
  saveShippingAddress,
  savePaymentMethod,
  clearCartItems,
} = cartSlice.actions;

export default cartSlice.reducer;
