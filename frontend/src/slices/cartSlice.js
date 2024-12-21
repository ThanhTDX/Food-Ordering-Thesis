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

const initialState = {
  name: "",
  cartContent: {
    items: [],
    promotion: [
      {
        name: "",
        discountPercentage: "",
      },
    ],
    price: 0,
    discountedPrice: 0,
  },
  information: {
    phoneNumber: "",
    name: "",
    address: "",
    deliveryTime: {
      date: null,
      time: null,
    },
  },
  payment: {
    orderId: "",
    method: "",
  },
  status: {
    loading: false,
    error: "",
    valid: false,
    paid: false,
  },
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action) => {
      // action.payload: cartItem
      // Find item in cart
      const itemIsInCart = state.cartContent.items.find(
        (item) => item._id === action.payload._id
      );
      // If item is not in cart, include new item with qty: 1
      if (!itemIsInCart) {
        const newItem = {
          ...action.payload,
          qty: 1,
        };
        state.cartContent.items.push(newItem);
      }
      // Else add 1 to quantity
      else {
        state.cartContent.items.map(
          (item) =>
            (item.qty = item._id === itemIsInCart._id ? item.qty + 1 : item.qty)
        );
      }
      // Update new price
      state.cartContent.price += Number(action.payload.price);
    },
    removeItemFromCart: (state, action) => {
      // action.payload: cartItem
      // for debugging
      // console.log(action.payload);

      // Find item in cart (assumming the item is already in cart)
      const itemExists = state.cartContent.items.find(
        (item) => item._id === action.payload._id
      );

      // Fool-proof method to not do anything if somehow item isn't in cart
      if (itemExists) {
        state.cartContent.items = state.cartContent.items.filter((item) => {
          return item._id !== itemExists._id;
        });

        // Update price
        state.cartContent.price =
          Number(state.cartContent.price) -
          Number(action.payload.price) * Number(action.payload.qty);
      }
    },
    updateItemInCart: (state, action) => {
      // action.payload = {cartItem, qty}
      const { cartItem, qty } = action.payload;

      // for debugging
      // console.log(cartItem);

      // this is assuming cartContent.item has item.qty
      // if this is adding new item to customMenu, refer to addMenuItem

      // qty can be smaller or larger than the current qty
      // there could also be custom value that's not incrementing
      // hence the *update*, instead of increment/decrement

      // Control condition where if qty is somehow smaller than 0, return
      if (Number(qty) < 0) return;

      // Update item based on _id
      state.cartContent.items.map(
        (item) =>
          (item.qty =
            item._id === cartItem._id ? Number(qty) : Number(item.qty))
      );
      // Calculate difference between item's qty and new qty (which can be negative)
      // then multiple with price and add the current price
      state.cartContent.price =
        state.cartContent.price +
        Number(cartItem.price) * Number(qty - cartItem.qty);
    },
    resetCart: () => initialState,
    setCartToCustomMenu: (state, action) => {
      const customMenu = localStorage.getItem("customMenu")
        ? JSON.parse(localStorage.getItem("customMenu"))
        : undefined;
      // Return Data

      console.log(customMenu);

      // If nothing, return empty array
      if (customMenu === undefined) return;

      // Else extract item/combo and put into result
      state.cartContent.items = customMenu.menu.menuItems;
      state.cartContent.price = customMenu.price;
    },
    clearCart: (state, action) => {
      state.cartContent.items = [];
      state.cartContent.price = 0;
      state.cartContent.discountedPrice = 0;
      state.payment.orderId = "";
      state.payment.method = "";
    },
    addPromotion: (state, action) => {
      // action.payload: promotion
      if (!state.cartContent.promotions.find(action.payload)) {
        state.cartContent.promotions.push(action.payload);
      }
      // state.cartContent.price = calculateDiscountedPrice(
      //   state.cartContent.price,
      //   state.cartContent.promotions
      // );
    },
    removePromotion: (state, action) => {
      // action.payload: promotion
      if (state.cartContent.promotions.find(action.payload)) {
        state.cartContent.promotions.filter((item) => {
          return item !== action.payload;
        });
      }
      // state.cartContent.price = calculateDiscountedPrice(
      //   state.cartContent.price,
      //   state.cartContent.promotions
      // );
    },
    updateName: (state, action) => {
      // action.payload: name - string
      state.information.name = action.payload;
    },
    updateAddress: (state, action) => {
      // action.payload: address - string
      state.information.address = action.payload;
    },
    updatePhoneNumber: (state, action) => {
      // action.payload: phoneNumber - string
      // TODO: put VN phone validator here
      if (
        action.payload === "" ||
        (action.payload.length > 9 &&
          action.payload.length < 12 &&
          action.payload.indexOf(0) === 0)
      ) {
        state.information.phoneNumber = action.payload;
      }
    },
    updatePayment: (state, action) => {
      // action.payload: payment - string
      state.payment.method = action.payload;
    },
    updateFinishedPayment: (state, action) => {
      // action.payload = orderId;
      state.payment.hasPaid = true;
      state.payment.orderId = action.payload;
    },
    updateDeliveryTime: (state, action) => {
      // action.payload: {date, time}
      state.information.deliveryTime.date = action.payload.date;
      state.information.deliveryTime.time = action.payload.time;
    },
    updateOrderId: (state, action) => {
      //action.payload: orderId - string
      state.payment.orderId = action.payload;
    },
    updateValid: (state, action) => {
      // action.payload: true/false
      state.status.valid = action.payload;
    },
    updatePaid: (state, action) => {
      // action.payload: true/false
      state.status.paid = action.payload;
    },
  },
});

export const {
  addItemToCart,
  removeItemFromCart,
  updateItemInCart,
  resetCart,
  clearCart,
  setCartToCustomMenu,
  addPromotion,
  removePromotion,
  updatePayment,
  updatePhoneNumber,
  updateName,
  updateAddress,
  updateDeliveryTime,
  updateOrderId,
  updateValid,
  updatePaid,
} = cartSlice.actions;

export const cartSelector = (state) => state.cart;
export default cartSlice.reducer;
