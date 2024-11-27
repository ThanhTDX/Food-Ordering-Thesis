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

const fetchCustomMenuStorage = () => {
  // Because data is from customMenu only the cartContent is updated
  // everything else is defaulted to it's initial value
  let result = {
    items: [],
    promotions: [
      {
        name: "",
        discountAmount: "",
      },
    ],
    price: 0,
    discountedPrice: 0,
  };
  const customMenu = localStorage.getItem("customMenu")
    ? JSON.parse(localStorage.getItem("customMenu"))
    : [];
  // Return Data

  // If nothing, return empty array
  if (!customMenu.length) {
    return result;
  }
  // Else extract item/combo and put into result
  for (const item of customMenu) {
    result.items.push(item);
    result.price += Number(item.price) * Number(item.qty);
  }
  return result;
};

// TODO: this value is HORRIBLE
const initialCartContentFromLocalStorage =
  // Fetching cart from LocalStorage
  localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart")).cartContent
    : fetchCustomMenuStorage();

// Initial value setup for cart information
const initialInformationFromLocalStorage =
  // Fetch from localStorage
  localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart")).information
    : {
        phoneNumber: "",
        name: "",
        address: "",
        deliveryTime: {
          date: new Date().toISOString().split("T")[0],
          time: new Date().toTimeString().slice(0, 5),
        },
      };
// Initial value setup for cart information
const initialPaymentFromLocalStorage =
  // Fetch from localStorage
  localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart")).payment
    : {
        paymentMethod: "",
        orderId: "",
      };

export const cartSlice = createSlice({
  // cart redux structure (i don't know how to do this so)
  // cartContent: {
  //   promotion: [
  //     {
  //       name: "",
  //       discountPercentage: "",
  //     },
  //   ],
  //   price: "",
  //   discountedPrice: "",
  // },
  // information: {
  //   phoneNumber: "",
  //   name: "",
  //   address: "",
  //   deliveryTime: "",
  // },
  // payment: {
  //   orderId: "",
  //   paymentMethod: "",
  // },
  name: "cart",
  initialState: {
    name: "",
    cartContent: initialCartContentFromLocalStorage,
    information: initialInformationFromLocalStorage,
    payment: initialPaymentFromLocalStorage,
    status: {
      loading: "",
      error: "",
    },
  },
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

      // Save to localStorage
      localStorage.setItem("cart", JSON.stringify(state));
    },
    removeItemFromCart: (state, action) => {
      // action.payload: cartItem
      console.log(action.payload);

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
      // Save to localStorage
      localStorage.setItem("cart", JSON.stringify(state));
    },
    updateItemInCart: (state, action) => {
      // action.payload = {cartItem, qty}
      const { cartItem, qty } = action.payload;
      console.log(cartItem);

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
      state.price =
        state.price + Number(cartItem.price) * Number(qty - cartItem.qty);

      // Save to localStorage
      localStorage.setItem("cart", JSON.stringify(state.cart));
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

      // Save to localStorage
      localStorage.setItem("cart", JSON.stringify(state));
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

      // Save to localStorage
      localStorage.setItem("cart", JSON.stringify(state));
    },
    updateName: (state, action) => {
      // action.payload: name - string
      state.information.name = action.payload;
      // Save to localStorage
      localStorage.setItem("cart", JSON.stringify(state));
    },
    updateAddress: (state, action) => {
      // action.payload: address - string
      state.information.address = action.payload;

      // Save to localStorage
      localStorage.setItem("cart", JSON.stringify(state));
    },
    updatePhoneNumber: (state, action) => {
      // action.payload: phoneNumber - string
      // TODO: put VN phone validator here
      if (
        action.payload.length < 10 ||
        action.payload.length > 12 ||
        action.payload.indexOf(0) !== 0
      ) {
        return;
      } else {
        console.log(action.payload);
        state.information.phoneNumber = action.payload;
      }
      // Save to localStorage
      localStorage.setItem("cart", JSON.stringify(state));
    },
    updatePayment: (state, action) => {
      // action.payload: {method, orderId} - string
      state.payment = action.payload;
      // Save to localStorage
      localStorage.setItem("cart", JSON.stringify(state));
    },
    updateDeliveryTime: (state, action) => {
      // action.payload: {date, time}
      state.information.deliveryTime.date = action.payload.date;
      state.information.deliveryTime.time = action.payload.time;
      // Save to localStorage
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const {
  addItemToCart,
  removeItemFromCart,
  updateItemInCart,
  addPromotion,
  removePromotion,
  updatePayment,
  updatePhoneNumber,
  updateName,
  updateAddress,
  updateDeliveryTime,
} = cartSlice.actions;

export const cartSelector = (state) => state.cart;
export default cartSlice.reducer;
