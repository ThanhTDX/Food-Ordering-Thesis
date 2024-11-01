import axios from "axios";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as menuApi from "../api/menuApi";

export const fetchAllFood = createAsyncThunk(
  "/api/menu/food/all/",
  async (_, thunkAPI) => {
    try {
      const menuItems = await menuApi.fetchAllFood();
      return menuItems;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchAllCombo = createAsyncThunk(
  "/api/menu/combo/all/",
  async (_, thunkAPI) => {
    try {
      const menuCombos = await menuApi.fetchAllCombo();
      return menuCombos;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchCombodById = createAsyncThunk(
  "/api/menu/combo/<:id>/",
  async (id, thunkAPI) => {
    try {
      const menuCombo = await menuApi.fetchComboById(id);
      return [menuCombo];
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchFoodById = createAsyncThunk(
  "api/menu/<:id>/",
  async (id, thunkAPI) => {
    try {
      const menuItem = await menuApi.fetchFoodById(id);
      return [menuItem];
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const menuSlice = createSlice({
  name: "menu",
  initialState: {
    menu: {
      menuItems: [],
      menuCombos: [],
    },
    error: "",
    loading: true,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      ///////////////
      .addCase(fetchAllFood.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchAllFood.fulfilled, (state, action) => {
        // action.payload = menuItems
        state.loading = false;
        state.menu.menuItems = action.payload;
        state.error = null;
      })
      .addCase(fetchAllFood.rejected, (state, action) => {
        // action.payload = error
        state.loading = false;
        state.error = action.payload;
      })
      ///////////////
      ///////////////
      .addCase(fetchAllCombo.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchAllCombo.fulfilled, (state, action) => {
        // action.payload = [menuItem]
        state.loading = false;
        state.menu.menuCombos = action.payload;
        state.error = null;
      })
      .addCase(fetchAllCombo.rejected, (state, action) => {
        // action.payload = error
        state.loading = false;
        state.error = action.payload;
      })
      ///////////////
      ///////////////
      .addCase(fetchFoodById.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchFoodById.fulfilled, (state, action) => {
        // action.payload = [menuItem]
        state.loading = false;
        state.menu.menuItems = action.payload;
      })
      .addCase(fetchFoodById.rejected, (state, action) => {
        // action.payload = error
        state.loading = false;
        state.error = action.payload;
      })
      ///////////////
      ///////////////
      .addCase(fetchCombodById.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchCombodById.fulfilled, (state, action) => {
        // action.payload = [menuCombo]
        state.loading = false;
        state.menu.menuCombos = action.payload;
      })
      .addCase(fetchCombodById.rejected, (state, action) => {
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
