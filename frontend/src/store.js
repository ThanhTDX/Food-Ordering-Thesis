import { combineReducers, applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import {
  menuListReducer,
  menuItemReducer,
} from "./reducers/menuReducers";
import { composeWithDevTools } from "@redux-devtools/extension";

const reducer = combineReducers({
  menuList: menuListReducer,
  menuItem: menuItemReducer,
});

const initialState = {};

const middleware = [thunk];

const store = configureStore(
  { reducer },
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
