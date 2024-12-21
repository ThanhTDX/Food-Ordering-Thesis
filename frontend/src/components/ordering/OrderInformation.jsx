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

function DateTimeInput({paid}) {
  const currentDate = new Date();
  const currentTime = currentDate.toISOString().slice(11, 16);

  const dispatch = useDispatch();
  const cart = useSelector(cartSelector);
  const { deliveryTime } = cart.information;
  // Honestly bad code, wish to find another approach to automatically update
  // when user change delivery time + date

  const [date, setDate] = useState(
    deliveryTime.date || currentDate.toISOString().slice(0, 10)
  );
  const [time, setTime] = useState(deliveryTime.time || currentTime);
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
        <DateInput date={date} setDate={setDate} disabled={paid}/>
        <TimeInput time={time} setTime={setTime} setError={setTimeError} disabled={paid}/>
      </Stack>
      {timeError && <Message variant="danger">{timeError}</Message>}
    </Stack>
  );
}

const OrderInformation = () => {
  const dispatch = useDispatch();
  const cart = useSelector(cartSelector);
  const { name, phoneNumber, address } = cart.information;
  const { paid } = cart.status
  const [localPhoneNumber, setLocalPhoneNumber] = useState(phoneNumber);

  useEffect(() => {
    if (
      localPhoneNumber === "" ||
      (localPhoneNumber.startsWith("0") &&
      localPhoneNumber.length > 9 &&
      localPhoneNumber.length < 12)
    ) {
      // Only update Redux state if the phone number is valid
      dispatch(updatePhoneNumber(localPhoneNumber));
    }
  }, [localPhoneNumber, dispatch]);

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
              value={name || ""}
              required
              onChange={(e) => dispatch(updateName(e.target.value))}
              disabled={paid}
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
              value={localPhoneNumber || ""}
              required
              onChange={(e) => setLocalPhoneNumber(e.target.value)}
              disabled={paid}
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
            value={address || ""}
            required
            onChange={(e) => dispatch(updateAddress(e.target.value))}
            disabled={paid}
          />
        </Form.Group>
        <Form.Group className="" controlId="formDateTime">
          <Form.Label className="m-0">
            <span className="ps-2">Delivery Time</span>
          </Form.Label>
          <DateTimeInput paid={paid}/>
        </Form.Group>
      </Stack>
    </Form>
  );
};

export default OrderInformation;
