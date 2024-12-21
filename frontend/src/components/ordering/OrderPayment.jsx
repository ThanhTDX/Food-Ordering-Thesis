import React, { useState } from "react";
import { Card, Image, Button, Form } from "react-bootstrap";

import Message from "../Message";
import Loader from "../Loader";

import paypalImg from "./images/paypal.svg";

import momoImg from "./images/1631085786958-Thiết kế không tên - 2021-09-08T002253.248.png";
import { useDispatch, useSelector } from "react-redux";
import { cartSelector, updatePayment } from "../../slices/cartSlice";

import "./css/OrderPayment.css"

const OrderPayment = () => {
  const dispatch = useDispatch();
  const cart = useSelector(cartSelector)
  const { method } = cart.payment;
  const {paid} = cart.status

  const handleChange = (e) => {
    dispatch(updatePayment(e.target.value));
  };

  return (
    <Card className="order--payment--choice">
      <Card.Title>
        <h3 className="fw-bold">Payment</h3>
      </Card.Title>
      <Card.Body className="py-2">
        <div className="d-flex align-items-center justify-content-around">
          <Form.Check inline className="m-0 p-0">
            <div className="d-flex align-items-center ">
              <Form.Check.Input
                type="radio"
                value="momo"
                id="momo"
                name="payment"
                className="me-2"
                checked={method === "momo"}
                onChange={handleChange}
                disabled={paid}
              />
              <Form.Check.Label htmlFor="momo">
                <Image src={momoImg} alt={momoImg} fluid />
              </Form.Check.Label>
            </div>
          </Form.Check>
          <Form.Check inline className="m-0 p-0">
            <div className="d-flex align-items-center ">
              <Form.Check.Input
                type="radio"
                name="payment"
                value="paypal"
                id="paypal"
                className="me-2"
                checked={method === "paypal"}
                onChange={handleChange}
                disabled={paid}
              />
              <Form.Check.Label htmlFor="paypal">
                <Image src={paypalImg} alt={paypalImg} fluid />
              </Form.Check.Label>
            </div>
          </Form.Check>
        </div>
      </Card.Body>
    </Card>
  );
};

export default OrderPayment;
