import React from "react";
import { Card, Row, Col, Image, Button } from "react-bootstrap";

import paypal from "./images/paypal.svg";
import momo from "./images/1631085786958-Thiết kế không tên - 2021-09-08T002253.248.png";

const OrderPayment = () => {
  const handleDoNothing = () => {};
  return (
    <Card className="">
      <Card.Title>
        <h3 className="fw-bold">Payment</h3>
      </Card.Title>
      <Card.Body >
        <Button variant="light" onClick={handleDoNothing} className="p-0 me-2">
          <Image
            width="45px"
            src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"
            alt="Visa"
          />
        </Button>
        <Image
          className="me-2"
          width="45px"
          src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg"
          alt="American Express"
        />
        <Image
          className="me-2"
          width="45px"
          src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
          alt="Mastercard"
        />
        <Image className="me-2" width="45px" src={paypal} alt="PayPal" />
        <Image className="me-2" width="45px" src={momo} alt="Momo" />
      </Card.Body>
    </Card>
  );
};

export default OrderPayment;
