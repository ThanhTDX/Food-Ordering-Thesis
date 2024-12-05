import React, { useState } from "react";
import axios from "axios";

import { Container, Row, Col, Stack, Button } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";

import CustomMenu from "../components/customMenu/CustomMenu";
import OrderCart from "../components/ordering/OrderCart";
import OrderPromotion from "../components/ordering/OrderPromotion";
import OrderSuggestion from "../components/ordering/OrderSuggestion";
import OrderInformation from "../components/ordering/OrderInformation";
import OrderPayment from "../components/ordering/OrderPayment";
import { useSelector } from "react-redux";
import { cartSelector } from "../slices/cartSlice";

const OrderingPage = () => {
  const cart = useSelector(cartSelector);
  const { orderId } = cart.payment;
  const { loading, error } = cart.status;

  const handleSubmitOrder = () => {
    // TODO
    const axiosPostCall = async () => {
      try {
        const response = await axios.post(
          "/api/ordering/create/",
          {
            name: cart.name,
            items: cart.cartContent.items,
            price: cart.cartContent.price,

            orderId: cart.payment.orderId,

            phoneNumber: cart.information.phoneNumber,
            username: cart.information.name,
            address: cart.information.address,
            deliveryTime:
              cart.information.deliveryTime.date +
              " " +
              cart.information.deliveryTime.time,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const responseData = response.data;
        console.log(responseData);
      } catch (error) {
        console.error(error);
      }
    };
    axiosPostCall();
  };

  return loading ? (
    <Loader height={100} width={100} />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Container>
      <Row>
        <Col md={12} lg={8}>
          <Stack direction="vertical" gap={3}>
            <OrderCart />
            <OrderPromotion />
            <OrderSuggestion />
          </Stack>
        </Col>
        <Col md={12} lg={4}>
          <Container className="border rounded-3 p-2">
            <Stack direction="vertical" gap={2}>
              <OrderInformation />
              <OrderPayment />
              <Button
                variant="info"
                type="submit"
                className="w-100 p-1"
                disabled={!orderId}
                onClick={handleSubmitOrder}
              >
                <strong>CREATE ORDER</strong>
              </Button>
            </Stack>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default OrderingPage;
