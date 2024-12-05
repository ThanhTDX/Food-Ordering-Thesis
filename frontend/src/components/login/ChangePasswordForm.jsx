import React, { useRef, useState } from "react";
import { Form, Stack, Button, Row, Col } from "react-bootstrap";
import "./LoginForm.css";

function ChangePasswordForm({ setForm }) {
  const [OTP, verifyOTP] = useState(false);
  const [otpNumber, setOtpNumber] = useState("0");
  const formRef = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    console.log("formRef.current", formData);
    const values = Object.fromEntries(formData.entries());
    console.log("Form Values:", values);
  };

  const handleOTPverification = () => {
    // TODO
    // Send a OTP verification on user's phone
    // and when verified the OTP choice will close
    verifyOTP(!OTP)
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
        <Row>
          <Col sm={12} md={8}>
            <Button
              variant="warning"
              onClick={handleOTPverification}
              disabled={OTP === true}
              className="w-100"
            >
              <span>OTP Verification</span>
            </Button>
          </Col>
          <Col sm={12} md={4}>
            <Form.Control
              type="num"
              placeholder="Number..."
              disabled={OTP === true}
            ></Form.Control>
          </Col>
        </Row>
        {OTP === true && (
          <>
            {" "}
            <Form.Group className="" controlId="form-pass1">
              <Form.Label className="ps-2 mb-0">
                <span>New Password</span>
              </Form.Label>
              <Form.Control
                type="text"
                name="form-pass1"
                placeholder="Enter new password..."
                required
              />
            </Form.Group>
            <Form.Group className="" controlId="form-pass2">
              <Form.Control
                type="password"
                name="form-pass2"
                placeholder="Re-enter new password..."
                required
              />
            </Form.Group>
            <Form.Group>
              <Button variant="warning" type="submit" className="w-100">
                Login
              </Button>
            </Form.Group>
          </>
        )}

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

export default ChangePasswordForm;
