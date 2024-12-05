import React, { useEffect, useState } from "react";

import { Form, Row, Col, Stack } from "react-bootstrap";
import DateInput from "../DateInput";
import TimeInput from "../TimeInput";
import Message from "../Message";
import { useDispatch, useSelector } from "react-redux";
import {
  cartSelector,
  updateName,
  updatePhoneNumber,
  updateAddress,
  updateDeliveryTime,
} from "../../slices/cartSlice";

function DateTimeInput() {
  const dispatch = useDispatch();
  const cart = useSelector(cartSelector);
  const { deliveryTime } = cart.information;
  // Honestly bad code, wish to find another approach to automatically update
  // when user change delivery time + date

  const [date, setDate] = useState(deliveryTime.date);
  const [time, setTime] = useState(deliveryTime.time);
  const [timeError, setTimeError] = useState("");
  useEffect(() => {
    dispatch(updateDeliveryTime({ date: date, time: time }));
  }, [date, time, dispatch]);

  return (
    <Stack gap={2} direction="vertical" className="">
      <Stack
        gap={2}
        direction="horizontal"
        className="d-flex justify-content-center"
      >
        <DateInput date={date} setDate={setDate} />
        <TimeInput time={time} setTime={setTime} setError={setTimeError} />
      </Stack>
      {timeError && <Message variant="danger">{timeError}</Message>}
    </Stack>
  );
}

const OrderInformation = () => {
  const dispatch = useDispatch();
  const cart = useSelector(cartSelector);
  const { name, phoneNumber, address } = cart.information;

  const handlePhoneNumber = (phoneNum) => {
    if (
      phoneNum.length < 10 ||
      phoneNum.length > 12 ||
      phoneNum.indexOf(0) !== 0
    ) {
      return;
    } else {
      dispatch(updatePhoneNumber(phoneNum));
    }
  };

  return (
    <Form className="">
      <h3 className="fw-bold">Information</h3>
      <Stack direction="vertical" gap={2}>
        <Stack direction="horizontal" gap={2}>
          <Form.Group className="" controlId="formName">
            <Form.Label className="mb-0">
              <span className="ps-2">Name</span>
            </Form.Label>
            <Form.Control
              type="text"
              name="formName"
              placeholder="Enter name..."
              required
              onChange={(e) => dispatch(updateName(e.target.value))}
            />
          </Form.Group>
          <Form.Group className="" controlId="formTel">
            <Form.Label className="mb-0">
              <span className="ps-2">Phone Number</span>
            </Form.Label>
            <Form.Control
              type="tel"
              name="formTel"
              placeholder="Enter Phone Number..."
              required
              onChange={(e) => handlePhoneNumber(e.target.value)}
            />
          </Form.Group>
        </Stack>
        <Form.Group className="" controlId="formAddress">
          <Form.Label className="mb-0">
            <span className="ps-2">Address</span>
          </Form.Label>
          <Form.Control
            type="text"
            name="formAddress"
            placeholder="Enter Address..."
            required
            onChange={(e) => dispatch(updateAddress(e.target.value))}
          />
        </Form.Group>
        <Form.Group className="" controlId="formDateTime">
          <Form.Label className="m-0">
            <span className="ps-2">Delivery Time</span>
          </Form.Label>
          <DateTimeInput />
        </Form.Group>
      </Stack>
    </Form>
  );
};

export default OrderInformation;
