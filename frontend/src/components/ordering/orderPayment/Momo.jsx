import axios from "axios";
import {Image, Button } from "react-bootstrap";
import momoImg from "../images/1631085786958-Thiết kế không tên - 2021-09-08T002253.248.png";
import React from "react";

import "../css/OrderPayment.css";

const Momo = ({isPaid, setPaid}) => {
  const handleSendPaymentRequest = async (phoneNumber, price) => {
    try {
      let url;
      if (localStorage.getItem("momo")) {
        const momoLocalStorage = JSON.parse(localStorage.getItem("momo"))
        console.log(momoLocalStorage)
        // if (30000 === Number(price))
          url = momoLocalStorage.shortLink;
      } else {
        const data = {
          phoneNumber: phoneNumber,
          price: price.toString(),
        };
        const response = await axios.post(
          `/api/ordering/momo/payment/`,
          JSON.stringify(data)
        );
        localStorage.setItem("momo", JSON.stringify(response.data.data));
        
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
        className="p-0 m-0 order--payment--logo"
        onClick={() => handleSendPaymentRequest("0999000999", 40000)}
        // disabled={!isPaid}
      >
        <Image className="rounded-3" src={momoImg} alt="Momo" />
      </Button>
    </>
  );
};

export default Momo;
