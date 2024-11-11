import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as menuApi from "../api/menuApi";

export const prefetch = createAsyncThunk("prefetch", async (_, thunkAPI) => {
  try {
    const allFood = await menuApi.fetchAllFood();
    const allCombo = await menuApi.fetchAllCombo();
    const allTags = await menuApi.fetchAllFoodTags();
    const allTypes = await menuApi.fetchAllFoodType();
    const comboTypes = await menuApi.fetchAllComboType();
    return { allFood, allCombo, allTags, allTypes, comboTypes };
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const menuSlice = createSlice({
  name: "menu",
  initialState: {
    menuFood: {
      items: [],
      combos: [],
      tags: [],
      types: [],
      combo_types: [],
    },
    menuSearch: {
      tags: [],
      type: "",
      combo: "",
      keyword: "",
    },
    menuView: "card",
    error: "",
    loading: true,
  },
  reducers: {
    updateSearchTags: (state, action) => {
      // action.payload: tag
      console.log(action.payload);
      if (
        state.menuSearch.tags.find(
          (tag) => tag.toLowerCase() === action.payload.toLowerCase()
        )
      ) {
        state.menuSearch.tags = state.menuSearch.tags.filter(
          (tag) => tag.toLowerCase() !== action.payload.toLowerCase()
        );
      } else {
        state.menuSearch.tags.push(action.payload);
      }
    },
    updateSearchType: (state, action) => {
      // action.payload: type
      if (state.menuSearch.type === action.payload) state.menuSearch.type = "";
      else state.menuSearch.type = action.payload;
    },
    updateSearchCombo: (state, action) => {
      // action.payload: combo
      if (state.menuSearch.combo === action.payload)
        state.menuSearch.combo = "";
      state.menuSearch.combo = action.payload;
    },
    updateSearchKeyword: (state, action) => {
      // action.payload: keyword
      state.menuSearch.keyword = action.payload;
    },
    updateView: (state, action) => {
      //action.payload: view
      state.menuView = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(prefetch.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(prefetch.fulfilled, (state, action) => {
        // action.payload = { allFood, allCombo, allTags, allType }
        state.loading = false;
        const { allFood, allCombo, allTags, allTypes, comboTypes } =
          action.payload;
        state.menuFood.items = allFood;
        state.menuFood.combos = allCombo;
        state.menuFood.tags = allTags;
        state.menuFood.types = allTypes;
        state.menuFood.combo_types = comboTypes;
      })
      .addCase(prefetch.rejected, (state, action) => {
        // action.payload = error
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  updateSearchTags,
  updateSearchType,
  updateSearchCombo,
  updateSearchKeyword,
  updateView,
} = menuSlice.actions;

export const menuSelector = (state) => state.menu;
export default menuSlice.reducer;
