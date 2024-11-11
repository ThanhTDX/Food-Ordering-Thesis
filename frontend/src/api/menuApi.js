import axios from "axios";
import __handleError from "./error/__handleError";

// GET /api/menu/food/all/
export const fetchAllFood = async () => {
  try {
    const response = await axios.get(`/api/menu/food/all/`);
    return response.data;
  } catch (error) {
    console.log(error.config);
    throw new Error(__handleError(error));
  }
};

// GET /api/menu/food/<id>/
export const fetchFoodById = async (id) => {
  try {
    const response = await axios.get(`/api/menu/food/${id}/`);
    return response.data;
  } catch (error) {
    console.log(error.config);
    throw new Error(__handleError(error));
  }
};

// GET /api/menu/combo/all/
export const fetchAllCombo = async () => {
  try {
    const response = await axios.get(`/api/menu/combo/all/`);
    return response.data;
  } catch (error) {
    console.log(error.config);
    throw new Error(__handleError(error));
  }
};

// GET /api/menu/combo/<id>/
export const fetchComboById = async (id) => {
  try {
    const response = await axios.get(`/api/menu/combo/${id}/`);
    return response.data;
  } catch (error) {
    console.log(error.config);
    throw new Error(__handleError(error));
  }
};

// GET /api/menu/tag/
export const fetchAllFoodTags = async () => {
  try {
    const response = await axios.get(`/api/menu/tag/`);
    return response.data;
  } catch (error) {
    console.log(error.config);
    throw new Error(__handleError(error));
  }
};

// GET /api/menu/type/
export const fetchAllFoodType = async () => {
  try {
    const response = await axios.get(`/api/menu/type/`);
    return response.data;
  } catch (error) {
    console.log(error.config);
    throw new Error(__handleError(error));
  }
};

// GET /api/menu/ingredient/
export const fetchAllFoodIngredient = async () => {
  try {
    const response = await axios.get(`/api/menu/ingredient/`);
    return response.data;
  } catch (error) {
    console.log(error.config);
    throw new Error(__handleError(error));
  }
};

// GET /api/menu/combo/type/
export const fetchAllComboType = async () => {
  try {
    const response = await axios.get(`/api/menu/combo/type/`);
    return response.data;
  } catch (error) {
    console.log(error.config);
    throw new Error(__handleError(error));
  }
};
