import { nanoid } from "nanoid";
import axios from "axios"

export const createPaymentRequest = async (phoneNumber, price) => {
  // Check if user's has entered phoneNumber and if cart has items
  if (!phoneNumber.length || !price) console.log("something");

  // Create new order
  const data = {
    id: nanoid(),
    phoneNumber: phoneNumber,
    price: price.toString(),
  };
  // And make api call to backend
  const response = await axios.post(
    `/api/ordering/momo/payment/`,
    JSON.stringify(data)
  );

  console.log(response.data.data)
  return response.data.data
};
