import { createSlice } from "@reduxjs/toolkit";
 
const initialState = {
  name: "",
  menu: {
    menuItems: [],
    menuCombo: [],
  },
  price: 0,
  numOfPeople: 0,
  nutritionValue: [],
  evaluation: [],
  status: {
    loading: false,
    error: "",
  },
};

export const customMenuSlice = createSlice({
  name: "customMenu",
  initialState,
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
    },

    updateMenuItem: (state, action) => {
      // action.payload = {menuItem, qty}
      const { menuItem, qty } = action.payload;

      // this is assuming menuItem has menuItem.qty
      // if this is adding new item to customMenu, refer to addMenuItem

      // qty can be smaller or larger than the current qty
      // there could also be custom value that's not incrementing
      // hence the *update*, instead of increment/decrement

      // Control condition where if qty is somehow smaller than 0, return
      if (Number(qty) < 0) return;

      // Update item based on _id
      state.menu.menuItems.map(
        (item) =>
          (item.qty =
            item._id === menuItem._id ? Number(qty) : Number(item.qty))
      );
      // Update price
      state.price =
        state.price + Number(menuItem.price) * Number(qty - menuItem.qty);
      // Save in localStorage
    },
    removeMenuItem: (state, action) => {
      // action.payload = menuItem
      const menuItem = action.payload;
      state.menu.menuItems = state.menu.menuItems.filter(
        (item) => item._id !== menuItem._id
      );
      state.price -= Number(menuItem.price) * Number(menuItem.qty);
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
