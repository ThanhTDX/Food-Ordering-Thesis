import axios from "axios";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchAllFood = createAsyncThunk("api/menu", async () => {
  try {
    const menuList = await axios.get(`/api/menu/`).then((response) => {
      return response.data;
    });
    const menuIngredient = await axios
      .get(`/api/menu/ingredient`)
      .then((response) => {
        return response.data;
      });
    const menuTag = await axios.get(`/api/menu/tag`).then((response) => {
      return response.data;
    });
    const menuType = await axios.get(`/api/menu/type`).then((response) => {
      return response.data;
    });
    menuList.map((menuItem) => {
      menuItem.food_tag.map((tag) => {
        const key = Object.keys(menuItem.food_tag).find(
          (key) => menuItem.food_tag[key] === tag
        );
        menuItem.food_tag[key] = menuTag[tag] ? menuTag[tag].name : "Unknown";
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
      });
    });
    return menuList;
  } catch (error) {
    return error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
  }
});

export const fetchAllFoodTag = createAsyncThunk("api/menu/tag", async () => {
  try {
    const { data } = await axios.get(`/api/menu/tag`);
    return data;
  } catch (error) {
    return error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
  }
});

export const fetchFoodById = createAsyncThunk("api/menu/<:id>", async (id) => {
  try {
    const { data } = await axios.get(`/api/menu/${id}`);
    return data;
  } catch (error) {
    return error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
  }
});

export const menuSlice = createSlice({
  name: "menu",
  initialState: {
    menuItems: [
      {
        name: "",
        price: -1,
        nutrition_value: [],
        count_in_stock: -1,
        image: "",
        tags: [],
        food_type: "",
        ingredients: [],
      },
    ],
    error: "",
    loading: true,
  },
  reducers: {
    
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAllFood.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchAllFood.fulfilled, (state, action) => {
        // action.payload = menuItems
        state.loading = false;
        state.menuItems = action.payload;
        state.error = "";
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
        state.error = "";
      })
      .addCase(fetchFoodById.rejected, (state, action) => {
        // action.payload = error
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {} = menuSlice.actions;

export const menuSelector = (state) => state.menu;
export default menuSlice.reducer;
