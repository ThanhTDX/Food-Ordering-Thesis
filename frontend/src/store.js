
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import customMenuReducer from "./slices/customMenuSlice";
import menuReducer from "./slices/menuSlice";
import resevationReducer from "./slices/reservationSlice";

const store = configureStore(
  {
    reducer: {
      cart: cartReducer,
      customMenu: customMenuReducer,
      menu: menuReducer,
      reservation: resevationReducer,
    },
  }
);

export default store;
