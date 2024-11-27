import React, { useRef, useState } from "react";
import { Form, Stack, Button } from "react-bootstrap";
import "./LoginForm.css";
import { useDispatch } from "react-redux";

import { userLogin as login } from "../../slices/userSlice";

function LoginForm({ setForm }) {
  const dispatch = useDispatch()
  const [rememberMe, setRememberMe] = useState(false);
  const formRef = useRef();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const values = Object.fromEntries(formData.entries());
    const data = {
      phoneNumber: values['form-tel'],
      password: values['form-pass']
    }
    dispatch(login(data))
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
          <Form.Group controlId="form-rememberMe" className="w-100">
            <Form.Check
              type="checkbox"
              label="Remember Me"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
          </Form.Group>
          <div className="w-100 text-end">
            <span
              onClick={() => setForm("changePassword")}
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
            onClick={() => setForm("loginStaff")}
          >
            Staff Login
          </Button>
        </Stack>
      </Stack>
    </Form>
  );
}

export default LoginForm;
