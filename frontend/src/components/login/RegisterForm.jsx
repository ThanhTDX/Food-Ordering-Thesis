import React, { useRef, useState } from "react";
import { Form, Stack, Button } from "react-bootstrap";
import "./LoginForm.css";

function RegisterForm({ setForm }) {
  const formRef = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    console.log("formRef.current", formData);
    const values = Object.fromEntries(formData.entries());
    console.log("Form Values:", values);
  };
  return (
    <Form onSubmit={handleSubmit} ref={formRef}>
      <Stack gap={3} direction="vertical">
        <Form.Group className="" controlId="form-tel">
          <Form.Label className="ps-2 mb-0">
            <span>Phone Number</span>
          </Form.Label>
          <Form.Control
            type="tel"
            name="form-tel"
            placeholder="Enter phone number..."
            required
          />
        </Form.Group>
        <Form.Group className="" controlId="form-pass1">
          <Form.Label className="ps-2 mb-0">
            <span>Password</span>
          </Form.Label>
          <Form.Control
            type="password"
            name="form-pass1"
            placeholder="Enter password..."
            required
          />
        </Form.Group>
        <Form.Group className="" controlId="form-pass2">
          <Form.Label className="ps-2 mb-0">
            <span>Re-enter Password</span>
          </Form.Label>
          <Form.Control
            type="password"
            name="form-pass2"
            placeholder="Re-enter password..."
            required
          />
        </Form.Group>
        <Form.Group>
          <Button variant="warning" type="submit" className="w-100">
            Register
          </Button>
        </Form.Group>
        <div className="or-container">
          <span className="or-text">OR</span>
          <div className="or-line"></div>
        </div>

        <Stack gap={2} direction="horizontal">
          <Button
            variant="success"
            className="w-100"
            onClick={() => setForm("login")}
          >
            Login
          </Button>
        </Stack>
      </Stack>
    </Form>
  );
}

export default RegisterForm;
