import {
  MENU_LIST_REQUEST,
  MENU_LIST_SUCCESS,
  MENU_LIST_FAIL,
  MENU_ITEM_REQUEST,
  MENU_ITEM_SUCCESS,
  MENU_ITEM_FAIL,
} from "../constants/menuConstants";

export const menuListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case MENU_LIST_REQUEST:
      return { loading: true, products: [] };

    case MENU_LIST_SUCCESS:
      return { loading: false, products: action.payload };

    case MENU_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const menuItemReducer = (
  state = { menuItem: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case MENU_ITEM_REQUEST:
      return { loading: true, ...state };

    case MENU_ITEM_SUCCESS:
      return { loading: false, menuItem: action.payload };

    case MENU_ITEM_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
