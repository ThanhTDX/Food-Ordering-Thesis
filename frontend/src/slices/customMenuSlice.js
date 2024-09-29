import { createSlice } from "@reduxjs/toolkit";

const customMenuItemsFromStorage = localStorage.getItem("customMenuItems")
  ? JSON.parse(localStorage.getItem("customMenuItems"))
  : [];

export const customMenuSlice = createSlice({
  name: "customMenu",
  initialState: {
    menuItems: customMenuItemsFromStorage,
    loading: false,
    error: "",
  },
  reducers: {
    addMenuItem: (state, action) => {
      // action.payload = menuItem
      let menuItem = action.payload
      const itemExist = state.menuItems.find((item) => item._id === menuItem._id)
      if (itemExist){
        state.menuItems.map((item) => item.qty = item._id === itemExist._id ? item.qty + 1 : item.qty)
      }
      else {
        menuItem = {...menuItem, qty:1} 
        state.menuItems.push(menuItem);
      }
      
      localStorage.setItem("customMenuItems", JSON.stringify(state.menuItems));
    },
    updateMenuItem: (state, action) => {
      // action.payload = {menuItem, qty}
      const {menuItem, qty} = action.payload
      console.log(menuItem, qty)
      state.menuItems.map(
        (item) =>
          (item.qty = item._id === menuItem._id ? qty : item.qty)
      );
      localStorage.setItem("customMenuItems", JSON.stringify(state.menuItems));
    },
    removeMenuItem: (state, action) => {
      // action.payload = menuItem
      const menuItem = action.payload
      state.menuItems.filter((item) => item._id === menuItem._id)
      localStorage.setItem("customMenuItems", JSON.stringify(state.menuItems));
    },
    evaluateCustomMenu: (state, action) => {
      // This is The Bread And Butter of the whole Project
      // Please do This
    },
  },
});

export const { addMenuItem, updateMenuItem, removeMenuItem } = customMenuSlice.actions;
export const customMenuSelector = (state) => state.customMenu;
export default customMenuSlice.reducer;
