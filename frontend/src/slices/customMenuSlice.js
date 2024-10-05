import { createSlice } from "@reduxjs/toolkit";

const customMenuItemsFromStorage = localStorage.getItem("customMenuItems")
  ? JSON.parse(localStorage.getItem("customMenuItems"))
  : [];

export const customMenuSlice = createSlice({
  name: "customMenu",
  initialState: {
    menuItems: customMenuItemsFromStorage,
    numOfPeople: 0,
    nutritionValue: [],
    price: 0,
    loading: false,
    error: "",
  },
  reducers: {
    addMenuItem: (state, action) => {
      // action.payload = menuItem
      let menuItem = action.payload;
      const itemExist = state.menuItems.find(
        (item) => item._id === menuItem._id
      );
      if (itemExist) {
        state.menuItems.map(
          (item) =>
            (item.qty = item._id === itemExist._id ? item.qty + 1 : item.qty)
        );
      } else {
        menuItem = { ...menuItem, qty: 1 };
        state.menuItems.push(menuItem);
      }
      state.price = Object.keys(state.menuItems).reduce(function (
        previous,
        key
      ) {
        return previous + Number(state.menuItems[key].price)*Number(state.menuItems[key].qty);
      },
      0);
      localStorage.setItem("customMenuItems", JSON.stringify(state.menuItems));
    },
    updateMenuItem: (state, action) => {
      // action.payload = {menuItem, qty}
      const { menuItem, qty } = action.payload;
      if (qty < 0) return;
      state.menuItems.map(
        (item) => (item.qty = item._id === menuItem._id ? qty : item.qty)
      );
      state.price = Object.keys(state.menuItems).reduce(function (
        previous,
        key
      ) {
        return (
          previous +
          Number(state.menuItems[key].price) * Number(state.menuItems[key].qty)
        );
      },
      0);
      localStorage.setItem("customMenuItems", JSON.stringify(state.menuItems));
    },
    removeMenuItem: (state, action) => {
      // action.payload = menuItem
      const menuItem = action.payload;
      state.menuItems = state.menuItems.filter(
        (item) => item._id !== menuItem._id
      );
      state.price = Object.keys(state.menuItems).reduce(function (
        previous,
        key
      ) {
        return (
          previous +
          Number(state.menuItems[key].price) * Number(state.menuItems[key].qty)
        );
      },
      0);
      localStorage.setItem("customMenuItems", JSON.stringify(state.menuItems));
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
