import React from "react";

import { Container, Row, Col, Stack, Button } from "react-bootstrap";

import CustomMenu from "../components/customMenu/CustomMenu";
import OrderCart from "../components/ordering/OrderCart";
import OrderPromotion from "../components/ordering/OrderPromotion";
import OrderSuggestion from "../components/ordering/OrderSuggestion";
import OrderInformation from "../components/ordering/OrderInformation";
import OrderPayment from "../components/ordering/OrderPayment";

const Ordering = () => {
  return (
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
          <Stack direction="vertical" gap={2}>
            <OrderInformation />
            <OrderPayment />
            <Button variant="info" type="submit" className="w-100 p-1">
              <strong>CREATE ORDER</strong>
            </Button>
          </Stack>
        </Col>
      </Row>
    </Container>
  );
};

export default Ordering;
