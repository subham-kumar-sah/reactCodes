import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";

const AppStore = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export default AppStore;
