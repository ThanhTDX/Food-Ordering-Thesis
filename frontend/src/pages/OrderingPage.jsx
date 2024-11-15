import React, { useState } from "react";

import { Container, Row, Col, Stack, Button } from "react-bootstrap";

import CustomMenu from "../components/customMenu/CustomMenu";
import OrderCart from "../components/ordering/OrderCart";
import OrderPromotion from "../components/ordering/OrderPromotion";
import OrderSuggestion from "../components/ordering/OrderSuggestion";
import OrderInformation from "../components/ordering/OrderInformation";
import OrderPayment from "../components/ordering/OrderPayment";

const OrderingPage = () => {
  const [isPaid, setPaid] = useState(false)
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
          <Container className="border rounded-3 p-2">
            <Stack direction="vertical" gap={2}>
              <OrderInformation />
              <OrderPayment isPaid={isPaid} setPaid={setPaid}/>
              <Button
                variant="info"
                type="submit"
                className="w-100 p-1"
                disabled={!isPaid}
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
