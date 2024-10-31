import axios from "axios";
import __handleError from "./error/__handleError";

// POST /api/users/login
export const userLogin = async (phone_number, password) => {
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  try {
    const response = await axios.post(
      `/api/users/login/`,
      {
        phone_number: phone_number,
        password: password,
      },
      config
    );
    return response.data;
  } catch (error) {
    console.log(error.config);
    throw new Error(__handleError(error));
  }
};

// POST /api/users/register
export const userRegister = async (phone_number, password) => {
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  try {
    const response = await axios.post(
      `/api/users/register/`,
      {
        phone_number: phone_number,
        password: password,
      },
      config
    );
    return response.data;
  } catch (error) {
    console.log(error.config);
    throw new Error(__handleError(error));
  }
};
