import { createSlice } from "@reduxjs/toolkit";

const customMenuItemsFromStorage = localStorage.getItem("customMenu")
  ? JSON.parse(localStorage.getItem("customMenu"))
  : [];

const initialPrice =
  customMenuItemsFromStorage.length === 0
    ? 0
    : Object.keys(customMenuItemsFromStorage).reduce(function (previous, key) {
        return (
          previous +
          Number(customMenuItemsFromStorage[key].price) *
            Number(customMenuItemsFromStorage[key].qty)
        );
      }, 0);

export const customMenuSlice = createSlice({
  name: "customMenu",
  initialState: {
    menu: {
      menuItems: customMenuItemsFromStorage,
      menuCombo: [],
    },
    price: initialPrice,
    numOfPeople: 0,
    nutritionValue: [],
    evaluation: [],
    loading: false,
    error: "",
  },
  reducers: {
    addMenuItem: (state, action) => {
      // action.payload = menuItem
      let menuItem = action.payload;
      const itemExist = state.menu.menuItems.find(
        (item) => item._id === menuItem._id
      );
      if (itemExist) {
        state.menu.menuItems.map(
          (item) =>
            (item.qty = item._id === itemExist._id ? item.qty + 1 : item.qty)
        );
      } else {
        menuItem = { ...menuItem, qty: 1 };
        state.menu.menuItems.push(menuItem);
      }
      state.price += Number(menuItem.price);
      localStorage.setItem("customMenu", JSON.stringify(state.menu.menuItems));
    },

    updateMenuItem: (state, action) => {
      // action.payload = {menuItem, qty}
      const { menuItem, qty } = action.payload;
      if (qty < 0) return;
      state.menu.menuItems.map(
        (item) => (item.qty = item._id === menuItem._id ? qty : item.qty)
      );
      state.price = state.price + Number(menuItem.price) * Number(qty - menuItem.qty);
      localStorage.setItem("customMenu", JSON.stringify(state.menu.menuItems));
    },
    removeMenuItem: (state, action) => {
      // action.payload = menuItem
      const menuItem = action.payload;
      state.menu.menuItems = state.menu.menuItems.filter(
        (item) => item._id !== menuItem._id
      );
      state.price -= Number(menuItem.price) * Number(menuItem.qty);
      localStorage.setItem(
        "customMenuItems",
        JSON.stringify(state.menu.menuItems)
      );
    },
    addCombo: (state, action) => {
      // action.payload = menuItem
      // TODO
    },
    removeCombo: (state, action) => {
      // action.payload = menuItem
      // TODO
    },
    updateCombo: (state, action) => {
      // action.payload = menuItem
      // TODO
    },
    evaluateCustomMenu: (state, action) => {
      // This is The Bread And Butter of the whole Project
      // Please do This
    },
  },
});

export const { addMenuItem, updateMenuItem, removeMenuItem } =
  customMenuSlice.actions;
export const customMenuSelector = (state) => state.customMenu;
export default customMenuSlice.reducer;
