import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as orderApi from "../api/orderApi";
import { customMenuSelector } from "./customMenuSlice";

const calculateDiscountedPrice = (price, arr) => {
  let currentPrice = price;
  for (const promotion of arr) {
    currentPrice =
      promotion.discount_type === "percentage"
        ? currentPrice * parseFloat(promotion.discount_type.replace("%", ""))
        : currentPrice - parseInt(promotion.amount);
  }
  return currentPrice;
};

const initialCartFromCustomMenuStorage = () => {
  // Fetching Custom Menu from LocalStorage
  const customMenu = localStorage.getItem("customMenu")
    ? JSON.parse(localStorage.getItem("customMenu"))
    : [];
  // Return Data
  let result = []
  // If nothing, return empty array
  if (!customMenu.length){
    return result;
  }
  // Else extract item/com and put into result
  for (const item of customMenu){
    result = [...result, item]
  }
  return result
} 

const initialPrice = () => {

}

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartContent: {
      items: initialCartFromCustomMenuStorage(),
      price: 0,
      promotions: [],
      discountedPrice: 0,
    },
    userContent: {
      phoneNumber: "",
      username: "",
    },
    billingInformation: {
      address: "",
      payment: {
        paymentMethod: "",
        data: "",
      },
    },
    status: "",
    loading: "",
    error: "",
  },
  reducers: {
    addItemToCart: (state, action) => {
      // action.payload: item
      if (!state.cartContent.items.find(action.payload)) {
        state.cartContent.items.push(action.payload);

        state.cartContent.price = calculateDiscountedPrice(
          state.cartContent.price,
          state.cartContent.promotions
        );
      }
    },
    removeItemFromCart: (state, action) => {
      // action.payload: item
      if (state.cartContent.promotions.find(action.payload)) {
        state.cartContent.items.filter((item) => {
          return item !== action.payload;
        });

        state.cartContent.price = calculateDiscountedPrice(
          state.cartContent.price,
          state.cartContent.promotions
        );
      }
    },
    addPromotion: (state, action) => {
      // action.payload: promotion
      if (!state.cartContent.promotions.find(action.payload)) {
        state.cartContent.promotions.push(action.payload);
      }
      state.cartContent.price = calculateDiscountedPrice(
        state.cartContent.price,
        state.cartContent.promotions
      );
    },
    removePromotion: (state, action) => {
      // action.payload: promotion
      if (state.cartContent.promotions.find(action.payload)) {
        state.cartContent.promotions.filter((item) => {
          return item !== action.payload;
        });
      }
      state.cartContent.price = calculateDiscountedPrice(
        state.cartContent.price,
        state.cartContent.promotions
      );
    },
  },
});


export const {
  addItemToCart,
  removeItemFromCart,
  addPromotion,
  removePromotion,
} = cartSlice.actions;

export const cartSelector = (state) => state.cart;
export default cartSlice.reducer;
