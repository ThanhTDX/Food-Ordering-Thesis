import axios from "axios";
import React, { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Image, Button } from "react-bootstrap";
import paypalImg from "../images/paypal.svg";

const Paypal = ({ isPaid, setPaid }) => {
  const [message, setMessage] = useState("");

  const initialOptions = {
    "client-id":
      "AQwVjVGI8SA-4IaoAiqw3qkgPSdYUzdwQiC6eaNsYYvqSB6R4N5nqKVnjPXiytthAAJLwRuBkNcj76Z8",
    "enable-funding": "",
    "disable-funding": "",
    "buyer-country": "US",
    currency: "USD",
    "data-page-type": "product-details",
    components: "buttons",
    "data-sdk-integration-source": "developer-studio",
  };

  const styles = {
    shape: "rect",
    layout: "horizontal",
    color: "white",
    height: 47,
    disableMaxWidth: true,
    tagline: false,
  };

  return (
    <div className="d-inline align-top">
      <PayPalScriptProvider options={initialOptions}>
        <PayPalButtons
          style={styles}
          createOrder={async () => {
            try {
              const response = await axios.post(
                "/api/ordering/paypal/payment_creation/",
                // only pass in the amount price
                {
                  amount: "50000",
                  phoneNumber: "0999000999",
                },
                {
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );
              const orderData = response.data;

              if (orderData.id) {
                return orderData.id;
              } else {
                const errorDetail = orderData?.details?.[0];
                const errorMessage = errorDetail
                  ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
                  : JSON.stringify(orderData);
                throw new Error(errorMessage);
              }
            } catch (error) {
              console.error(error);
              setMessage(`Could not initiate PayPal Checkout...${error}`);
            }
          }}
          onApprove={async (data, actions) => {
            try {
              const response = await axios.post(
                `/api/ordering/paypal/approve_callback/`,
                {
                  orderId: data.orderID,
                },
                {
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );

              const orderData = response.data;
              // Three cases to handle:
              //   (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
              //   (2) Other non-recoverable errors -> Show a failure message
              //   (3) Successful transaction -> Show confirmation or thank you message

              const errorDetail = orderData?.details?.[0];

              if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
                // (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
                // recoverable state, per https://developer.paypal.com/docs/checkout/standard/customize/handle-funding-failures/
                return actions.restart();
              } else if (errorDetail) {
                // (2) Other non-recoverable errors -> Show a failure message
                throw new Error(
                  `${errorDetail.description} (${orderData.debug_id})`
                );
              } else {
                // (3) Successful transaction -> Show confirmation or thank you message
                // Or go to another URL:  actions.redirect('thank_you.html');
                const transaction =
                  orderData.purchase_units[0].payments.captures[0];
                setMessage(
                  `Transaction ${transaction.status}: ${transaction.id}. See console for all available details`
                );
                console.log(
                  "Capture result",
                  orderData,
                  JSON.stringify(orderData, null, 2)
                );
              }
            } catch (error) {
              console.error(error);
              setMessage(
                `Sorry, your transaction could not be processed...${error}`
              );
            }
          }}
        />
      </PayPalScriptProvider>
    </div>
  );
};

export default Paypal;
