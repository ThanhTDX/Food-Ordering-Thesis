import axios from "axios";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as menuApi from "../api/menuApi";

export const fetchAllFood = createAsyncThunk(
  "api/menu",
  async (_, thunkAPI) => {
    try {
      const menuItems = await menuApi.fetchAllFood();
      const menuIngredient = await menuApi.fetchAllFoodIngredient();
      const menuTag = await menuApi.fetchAllFoodTags();
      const menuType = await menuApi.fetchAllFoodType();
      menuItems.map((menuItem) => {
        menuItem.food_tag.map((tag) => {
          const key = Object.keys(menuItem.food_tag).find(
            (key) => menuItem.food_tag[key] === tag
          );
          menuItem.food_tag[key] = menuTag[tag] ? menuTag[tag].name : "Unknown";
          return tag;
        });
        menuItem.food_type =
          menuType[menuItem.food_type] !== undefined
            ? menuType[menuItem.food_type].name
            : "Unknown";
        menuItem.ingredient.map((item) => {
          const key = Object.keys(menuItem.ingredient).find(
            (key) => menuItem.ingredient[key] === item
          );
          menuItem.ingredient[key] = menuIngredient[item]
            ? menuIngredient[item].name
            : "Unknown";
          return item;
        });
        return menuItem;
      });
      return menuItems;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchFoodById = createAsyncThunk(
  "api/menu/<:id>",
  async (id, thunkAPI) => {
    try {
      const menuItem = await menuApi.fetchFoodById(id);
      const menuIngredient = await menuApi.fetchAllFoodIngredient();
      const menuTag = await menuApi.fetchAllFoodTags();
      const menuType = await menuApi.fetchAllFoodType();

      menuItem.food_tag.map((tag) => {
        const key = Object.keys(menuItem.food_tag).find(
          (key) => menuItem.food_tag[key] === tag
        );
        menuItem.food_tag[key] = menuTag[tag] ? menuTag[tag].name : "Unknown";
        return tag;
      });

      menuItem.food_type =
        menuType[menuItem.food_type] !== undefined
          ? menuType[menuItem.food_type].name
          : "Unknown";

      menuItem.ingredient.map((item) => {
        const key = Object.keys(menuItem.ingredient).find(
          (key) => menuItem.ingredient[key] === item
        );
        menuItem.ingredient[key] = menuIngredient[item]
          ? menuIngredient[item].name
          : "Unknown";
        return item;
      });

      return [menuItem];
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const menuSlice = createSlice({
  name: "menu",
  initialState: {
    menuItems: [],
    menuCombos: [],
    error: "",
    loading: true,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchAllFood.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchAllFood.fulfilled, (state, action) => {
        // action.payload = menuItems
        state.loading = false;
        state.menuItems = action.payload;
        state.error = null;
      })
      .addCase(fetchAllFood.rejected, (state, action) => {
        // action.payload = error
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchFoodById.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchFoodById.fulfilled, (state, action) => {
        // action.payload = menuItem
        state.loading = false;
        state.menuItems = action.payload;
      })
      .addCase(fetchFoodById.rejected, (state, action) => {
        // action.payload = error
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// eslint-disable-next-line no-empty-pattern
export const {} = menuSlice.actions;

export const menuSelector = (state) => state.menu;
export default menuSlice.reducer;
