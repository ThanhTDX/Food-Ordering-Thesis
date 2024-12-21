import axios from "axios";
import { Image, Button } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";

import React from "react";

import "../css/OrderPayment.css";
import { useDispatch, useSelector } from "react-redux";
import { cartSelector, updatePayment } from "../../../slices/cartSlice";

import { nanoid } from "nanoid";

const Momo = ({ setError, setLoading }) => {
  const dispatch = useDispatch();
  const cart = useSelector(cartSelector);
  const { cartContent } = cart;
  const { phoneNumber } = cart.information;
  const { orderId } = cart.payment
  const { price } = cart.cartContent;

  const [searchParams, setSearchParams] = useSearchParams();

  

  // Check url
  // 2 cases:
  // 1: url link has params (momo return successful link)
  // 2: normal link, momo doesn't have params
  let url = window.location.href;
  if (url.includes("?")) {
    // Case 1: update paymentMethod and orderId
    if (searchParams.get("orderId")) {
      dispatch(
        updatePayment({
          paymentMethod: "momo",
          orderId: searchParams.get("orderId"),
        })
      );
    }
  } else {
    // Case 2: do nothing
  }

  const handleSendPaymentRequest = async (phoneNumber, price) => {
    // Check if user's has entered phoneNumber and if cart has items
    if (!phoneNumber.length || !price) console.log("something");

    // Access momo in localStorage
    const momoLocalStorage = JSON.parse(localStorage.getItem("momo"));
    try {
      // output url
      let url;
      // If localStorageExists and cart is the same as current cartContent
      // then redirect to (presumably) existing momo link
      if (momoLocalStorage && momoLocalStorage.cart === cartContent) {
        url = momoLocalStorage.shortLink;
      } else {
        // Else create new order
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

        // Backend will return a redirectUrl and orderId
        // Save the backend return value + order content into localStorage
        const combinedData = {
          ...response.data.data,
          order: cartContent,
        };
        localStorage.setItem("momo", JSON.stringify(combinedData));

        // Finally, output url to be redirectMomoUrl
        url = response.data.data.shortLink;
      }
      window.location.href = url;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Button
        variant="light"
        className="p-0 m-0 order--payment--logo w-100"
        onClick={() => handleSendPaymentRequest(phoneNumber, price)}
        disabled={orderId} // paymentMethod: string
      >
        <Image className="rounded-3" src={momoImg} alt="Momo" />
      </Button>
    </>
  );
};

export default Momo;
