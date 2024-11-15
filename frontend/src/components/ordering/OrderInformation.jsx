import React, { useState } from "react";

import { Form, Row, Col, Stack } from "react-bootstrap";
import DateInput from "../DateInput";
import TimeInput from "../TimeInput";
import Message from "../Message";

function DateTimeInput() {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [time, setTime] = useState(new Date().toTimeString().slice(0, 5));
  const [timeError, setTimeError] = useState("");
  return (
    <Stack gap={2} direction="vertical" className="">
      <Form.Label className="m-0">
        <span className="ps-2">Delivery Time</span>
      </Form.Label>
      <Stack
        gap={2}
        direction="horizontal"
        className="d-flex justify-content-center"
      >
        <DateInput date={date} setDate={setDate} />
        <TimeInput time={time} setTime={setTime} setError={setTimeError} />
      </Stack>
      {timeError && <Message variant="danger"> {timeError}</Message>}
    </Stack>
  );
}

const OrderInformation = ({ orderingFormRef }) => {
  const handleSubmit = () => {};
  return (
    <Form ref={orderingFormRef} className="" onSubmit={handleSubmit}>
      <h3 className="fw-bold">Information</h3>
      <Stack direction="vertical" gap={2}>
        <Stack direction="horizontal" gap={2}>
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
        </Stack>
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
        <DateTimeInput />
      </Stack>
    </Form>
  );
};

export default OrderInformation;
