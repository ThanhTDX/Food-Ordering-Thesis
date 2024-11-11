import React from "react";

import { Form, Row, Col, Stack } from "react-bootstrap";

const OrderInformation = ({ orderingFormRef }) => {
  const handleSubmit = () => {};
  return (
    <Form
      ref={orderingFormRef}
      className=""
      onSubmit={handleSubmit}
    >
      <h3 className="fw-bold">Information</h3>
      <Stack direction="vertical" gap={2}>
        <Row>
          <Col md={6} lg={4} className="pe-1">
            <Form.Group className="" controlId="form-name">
              <Form.Label className="mb-0">
                <span className="ps-2">Name</span>
              </Form.Label>
              <Form.Control
                type="text"
                name="form-name"
                placeholder="Enter name..."
                required
              />
            </Form.Group>
          </Col>
          <Col md={6} lg={8} className="ps-1">
            <Form.Group className="" controlId="form-tel">
              <Form.Label className="mb-0">
                <span className="ps-2">Phone Number</span>
              </Form.Label>
              <Form.Control
                type="tel"
                name="form-tel"
                placeholder="Enter Phone Number..."
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group className="" controlId="form-address">
          <Form.Label className="mb-0">
            <span className="ps-2">Address</span>
          </Form.Label>
          <Form.Control
            type="tel"
            name="form-tel"
            placeholder="Enter Address..."
            required
          />
        </Form.Group>
        <Row>
          <Form.Label>
            <span className="ps-2">Delivery Time</span>
          </Form.Label>
          <Col md={6} lg={6}>
            <Form.Group className="" controlId="form-date">
              <Form.Control
                type="date"
                name="form-date"
                className="custom-select"
                required
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col md={6} lg={6}>
            <Form.Group className="" controlId="form-time">
              <Form.Control
                type="time"
                name="form-time"
                className="custom-select"
                required
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>
      </Stack>
    </Form>
  );
};

export default OrderInformation;
