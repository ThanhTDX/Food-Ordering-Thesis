import React, { useRef, useState } from "react";
import { Form, Stack, Button } from "react-bootstrap";
import "./LoginForm.css";

function LoginStaffForm({ setForm }) {
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
        <Form.Group className="" controlId="form-username">
          <Form.Label className="ps-2 mb-0">
            <span>Username</span>
          </Form.Label>
          <Form.Control
            type="text"
            name="form-username"
            placeholder="Enter username..."
            required
          />
        </Form.Group>
        <Form.Group className="" controlId="form-pass">
          <Form.Label className="ps-2 mb-0">
            <span>Password</span>
          </Form.Label>
          <Form.Control
            type="password"
            name="form-pass"
            placeholder="Enter password..."
            required
          />
        </Form.Group>
        <Stack
          gap={2}
          direction="horizontal"
          className="d-flex align-items-center justify-content-around"
        >
          <div className="w-100 text-end">
            <span
              onClick={() => {
                setForm("changePassword");
              }}
              className="forgot-password"
            >
              Forgot Password?
            </span>
          </div>
        </Stack>
        <Form.Group>
          <Button variant="warning" type="submit" className="w-100">
            Login
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
            onClick={() => setForm("register")}
          >
            Register
          </Button>
          <Button
            variant="success"
            className="w-100"
            onClick={() => setForm("login")}
          >
            User Login
          </Button>
        </Stack>
      </Stack>
    </Form>
  );
}

export default LoginStaffForm;
