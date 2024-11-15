import React, { useState } from "react";
import { Card, Row, Col, Image, Button } from "react-bootstrap";

import Message from "../Message";
import Momo from "./orderPayment/Momo";
import Paypal from "./orderPayment/Paypal"
import Vnpay from "./orderPayment/Vnpay";

const OrderPayment = ({isPaid, setPaid}) => {
  const [loading, setLoading] = useState("")
  const [error, setError] = useState(false)
  return (
    <Card className="order--payment--choice">
      <Card.Title>
        <h3 className="fw-bold">Payment</h3>
      </Card.Title>
      <Card.Body className="">
        <Row className="gx-2">
          <Col
            xs={3}
            className="p-0 m-0 d-flex justify-content-center align-items-center"
          >
            <Momo />
          </Col>
          <Col
            xs={6}
            className="p-0 m-0"
          >
            <Paypal />
          </Col>
          <Col xs={3} className="p-0 m-0">
            <Vnpay />
          </Col>
        </Row>
        {error && (
          <Message variant="danger">
            Something went wrong, please try other methods
          </Message>
        )}
      </Card.Body>
    </Card>
  );
};

export default OrderPayment;
