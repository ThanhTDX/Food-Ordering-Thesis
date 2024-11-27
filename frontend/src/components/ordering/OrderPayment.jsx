import React, { useState } from "react";
import { Card, Row, Col, Image, Button } from "react-bootstrap";

import Message from "../Message";
import Momo from "./orderPayment/Momo";
import Paypal from "./orderPayment/Paypal";
import Vnpay from "./orderPayment/Vnpay";
import Loader from "../Loader";

const OrderPayment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  return (
    <Card className="order--payment--choice">
      <Card.Title>
        <h3 className="fw-bold">Payment</h3>
      </Card.Title>
      <Card.Body className="py-2">
        <Row className="gx-2">
          <Col
            xs={3}
            className="p-0 m-0 d-flex justify-content-center align-items-center"
          >
            <Momo setError={setError} setLoading={setLoading} />
          </Col>
          <Col xs={9} className="p-0 m-0 py-0">
            <Paypal setError={setError} setLoading={setLoading}   />
          </Col>
          {/* TODO: include VNPAY payment */}
          {/* <Col xs={3} className="p-0 m-0">
            <Vnpay />
          </Col> */}
        </Row>
        {loading && <Loader height={50} width={50} />}
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
