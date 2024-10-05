import axios from "axios";
import __handleError from "./error/__handleError";

// GET /api/menu
export const fetchAllFood = async () => {
  try {
    const response = await axios.get(`/api/menu/`);
    return response.data;
  } catch (error) {
    console.log(error.config);
    throw new Error(__handleError(error));
  }
};

export const fetchAllFoodTags = async () => {
  try {
    const response = await axios.get(`/api/menu/tag`);
    return response.data;
  } catch (error) {
    console.log(error.config);
    throw new Error(__handleError(error));
  }
};

export const fetchAllFoodType = async () => {
  try {
    const response = await axios.get(`/api/menu/type`);
    return response.data;
  } catch (error) {
    console.log(error.config);
    throw new Error(__handleError(error));
  }
};

export const fetchAllFoodIngredient = async () => {
  try {
    const response = await axios.get(`/api/menu/ingredient`);
    return response.data;
  } catch (error) {
    console.log(error.config);
    throw new Error(__handleError(error));
  }
};
