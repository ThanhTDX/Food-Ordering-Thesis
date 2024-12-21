import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import customMenuReducer from "./slices/customMenuSlice";
import menuReducer from "./slices/menuSlice";
import userReducer from "./slices/userSlice";
import resevationReducer from "./slices/reservationSlice";

import {
  loadCart,
  saveCart,
  loadCustomMenu,
  saveCustomMenu,
  loadUser,
} from "./utils/localStorage";

let preloadedState = {
  cart: loadCart(),
  customMenu: loadCustomMenu(),
  user: loadUser(),
};

const store = configureStore({
  reducer: {
    cart: cartReducer,
    customMenu: customMenuReducer,
    menu: menuReducer,
    user: userReducer,
    reservation: resevationReducer,
  },
  preloadedState,
});

// Store previous state to check for changes
let previousCartState = store.getState().cart;
let previousCustomMenuState = store.getState().customMenu;

// Save the `cart` state to localStorage whenever it changes
store.subscribe(() => {
  const currentState = store.getState();
  // save the cart and customMenu to localstorage
  // Check if `counter` slice has changed
  if (currentState.cart !== previousCartState) {
    saveCart(currentState.cart);
    previousCartState = currentState.counter; // Update previous state
  }

  // Check if `userPreferences` slice has changed
  if (currentState.customMenu !== previousCustomMenuState) {
    saveCustomMenu(currentState.customMenu);
    previousCustomMenuState = currentState.customMenu; // Update previous state
  }
});

export default store;
