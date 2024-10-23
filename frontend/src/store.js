
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import customMenuReducer from "./slices/customMenuSlice";
import menuReducer from "./slices/menuSlice";
import userReducer from "./slices/userSlice";
import resevationReducer from "./slices/reservationSlice";

const store = configureStore(
  {
    reducer: {
      cart: cartReducer,
      customMenu: customMenuReducer,
      menu: menuReducer,
      user: userReducer,
    },
  }
);

export default store;
