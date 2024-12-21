import React, { useState, useEffect, useMemo, useCallback } from "react";
import axios from "axios";

import { Container, Row, Col, Stack, Button } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import OrderCart from "../components/ordering/OrderCart";
import OrderPromotion from "../components/ordering/OrderPromotion";
import OrderSuggestion from "../components/ordering/OrderSuggestion";
import OrderInformation from "../components/ordering/OrderInformation";
import OrderPayment from "../components/ordering/OrderPayment";
import { useDispatch, useSelector } from "react-redux";
import {
  cartSelector,
  updateValid,
  updateOrderId,
  updatePaid,
  resetCart,
} from "../slices/cartSlice";
import { Link, useNavigate } from "react-router-dom";

import { createPaymentRequest } from "../components/ordering/orderPayment/Momo";
import { initializePayPalOrder } from "../components/ordering/orderPayment/Paypal";

const OrderBill = ({ url, setUrl }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    setTimeout(() => {
      setError("");
    }, 2000);
  }, [error]);

  const handleShowBill = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`/api/ordering/download_file/${url}`, {
        responseType: "blob", // This tells Axios to handle the response as a Blob (binary data)
        headers: {
          "Content-Type": "text/plain",
        },
      });
      // Check if the response is valid (optional)
      if (response.status !== 200) {
        throw new Error("File not found");
      }

      // Create a URL for the blob
      const blob = response.data;
      const redirectURL = window.URL.createObjectURL(blob);

      // OPEN THE FILE IN A NEW WINDOW
      // Open the file in a new tab or window
      const newWindow = window.open(redirectURL, "_blank");

      // Optional: Handle the case where the new window can't be opened (e.g., popup blocker)
      if (!newWindow) {
        alert("Please allow popups for this site to view the file.");
      }

      // DOWNLOAD THE FILE
      // Create a temporary link element to trigger the download
      // const a = document.createElement("a");
      // a.href = redirectURL;
      // a.download = "myfile.txt"; // The name of the file to be downloaded
      // a.click(); // Programmatically click the link to trigger the download

      // Cleanup the URL object after the download
      window.URL.revokeObjectURL(redirectURL);
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };
  const handleNewOrder = () => {
    dispatch(resetCart());
    setUrl("")
    navigate("/order");
  };
  return (
    <div className="mt-2">
      <Message variant={"success"}>
        <div>You have successfully created an order!</div>
        <div className="text-end mt-2">
          <Button variant="success" onClick={handleShowBill} className="me-2">
            Show Bill
          </Button>
          <Button variant="success" onClick={handleNewOrder} className="ms-2">
            Create New Order
          </Button>
        </div>
      </Message>
      {error && (
        <Message variant={"danger"} className="mt-2">
          Sorry we cannot do that right now.
        </Message>
      )}
    </div>
  );
};

const OrderingPage = () => {
  const dispatch = useDispatch();
  const cart = useSelector(cartSelector);
  const orderDetails = {
    totalAmount: cart.cartContent.price, // Total amount from cart
  };
  const { price } = cart.cartContent;
  const { phoneNumber } = cart.information;
  const { orderId, method } = cart.payment;
  const { loading, error, valid, paid } = cart.status;

  const [orderUrl, setOrderUrl] = useState(orderId);

  const createOrder = async (cart) => {
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
      const responseData = response;
      return responseData;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    let validForm = true;
    if (!cart.cartContent.items.length) validForm = false;
    if (
      !cart.information.phoneNumber ||
      !cart.information.name ||
      !cart.information.address ||
      !cart.information.deliveryTime.date ||
      !cart.information.deliveryTime.time
    )
      validForm = false;
    if (!cart.payment.method) validForm = false;
    if (validForm === !valid) dispatch(updateValid(validForm));
  }, [dispatch, valid, cart]);

  const handleMomoSuccessfulOrder = async () => {
    const newOrder = await createOrder(cart);
    if (newOrder.status === 200) setOrderUrl(orderId);
  };

  const handlePaypalSuccessfulOrder = async () => {
    const newOrder = await createOrder(cart);
    if (newOrder.status === 200) setOrderUrl(orderId);
  };

  const handleSubmitOrder = async () => {
    if (method === "momo") {
      const initiatePayment = await createPaymentRequest(phoneNumber, price);
      dispatch(updateOrderId(initiatePayment.orderId));
      window.location.href = initiatePayment.payUrl;
    } else if (method === "paypal") {
      initializePayPalOrder(
        "AQwVjVGI8SA-4IaoAiqw3qkgPSdYUzdwQiC6eaNsYYvqSB6R4N5nqKVnjPXiytthAAJLwRuBkNcj76Z8",
        orderDetails,
        handlePaypalSuccessfulOrder
      );
    }
  };

  const queryParams = new URLSearchParams(window.location.search);
  if (queryParams?.get("resultCode") && cart.status.paid === false) {
    dispatch(updatePaid(true));
    handleMomoSuccessfulOrder(cart);
  }

  return loading ? (
    <Loader height={100} width={100} />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Container>
      <Row>
        <Col md={12} lg={8}>
          <Stack direction="vertical" gap={2}>
            <OrderCart />
            {/* <OrderPromotion /> */}
            <OrderSuggestion />
          </Stack>
        </Col>
        <Col md={12} lg={4}>
          <Container className="border rounded-3 p-2">
            <Stack direction="vertical" gap={2}>
              <OrderInformation />
              <OrderPayment />
              <div id="paypal-button-container">
                <Button
                  variant="info"
                  type="submit"
                  className="w-100 p-1"
                  disabled={!valid}
                  onClick={handleSubmitOrder}
                >
                  <strong>CREATE ORDER</strong>
                </Button>
              </div>
            </Stack>
          </Container>
          {paid && <OrderBill url={orderUrl} setUrl={setOrderUrl}/>}
        </Col>
      </Row>
    </Container>
  );
};

export default OrderingPage;
