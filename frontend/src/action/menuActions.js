import axios from "axios";

import {
  MENU_LIST_REQUEST,
  MENU_LIST_SUCCESS,
  MENU_LIST_FAIL,
  MENU_ITEM_REQUEST,
  MENU_ITEM_SUCCESS,
  MENU_ITEM_FAIL,
} from "../constants/menuConstants";

export const menuList = () => async (dispatch) => {
  try {
    dispatch({ type: MENU_LIST_REQUEST });

    const { data } = await axios.get("/api/menu/");

    dispatch({
      type: MENU_LIST_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: MENU_LIST_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const menuItem = (id) => async (dispatch) => {
  try {
    dispatch({ type: MENU_ITEM_REQUEST });

    const { data } = await axios.get(`/api/menu/${id}`);

    dispatch({
      type: MENU_ITEM_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: MENU_ITEM_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};
