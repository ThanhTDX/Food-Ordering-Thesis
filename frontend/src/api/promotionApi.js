import axios from "axios";
import __handleError from "./error/__handleError";

// GET /api/promotion/all/
export const fetchAllPromotion = async () => {
  try {
    const response = await axios.get(`/api/promotion/all/`);
    return response.data;
  } catch (error) {
    console.log(error.config);
    throw new Error(__handleError(error));
  }
};

// GET /api/promotion/all/<id>
export const fetchPromotionById = async (id) => {
  try {
    const response = await axios.get(`/api/promotion/all/${id}/`);
    return response.data;
  } catch (error) {
    console.log(error.config);
    throw new Error(__handleError(error));
  }
};
