
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  cartUserCount: 0, 
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.cartItems = action.payload.cartItems;
      state.cartUserCount = action.payload.totalQuantity;
    },

    addToCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex((item) => item.id === action.payload.id);

      if (itemIndex >= 0) {
        state.cartItems[itemIndex].quantity += action.payload.quantity;
      } else {
        state.cartItems.push(action.payload);
      }

      state.cartUserCount = state.cartItems.reduce((total, item) => total + item.quantity, 0);
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
      localStorage.setItem("cartUserCount", state.cartUserCount);
    },

    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((item) => item.id !== action.payload);
      state.cartUserCount = state.cartItems.reduce((total, item) => total + item.quantity, 0);
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
      localStorage.setItem("cartUserCount", state.cartUserCount);
    },

    updateQuantity: (state, action) => {
      const item = state.cartItems.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
      state.cartUserCount = state.cartItems.reduce((total, item) => total + item.quantity, 0);
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
      localStorage.setItem("cartUserCount", state.cartUserCount);
    },

    loadCartFromStorage: (state) => {
      const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
      state.cartItems = storedCart;
      state.cartUserCount = storedCart.reduce((total, item) => total + item.quantity, 0);
    },

    clearCart: (state) => { 
      state.cartItems = [];
      state.cartUserCount = 0;
      localStorage.removeItem("cart");
      localStorage.removeItem("cartUserCount");
    },
  },
});

export const { setUser, addToCart, removeFromCart, updateQuantity, loadCartFromStorage, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
