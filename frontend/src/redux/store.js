
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authslice";
import cupcakeReducer from "./cupcakeSlice";
import cartReducer from "./cartSlice";

const store = configureStore({
  reducer: {
    cupcake: cupcakeReducer,
    auth: authReducer,
    cart: cartReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false, 
      serializableCheck: false, 
    }),
});

export default store;
