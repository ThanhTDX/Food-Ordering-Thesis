import React, { useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { Form, Button, Row, Col, Stack } from "react-bootstrap";
import CustomMenu from "../customMenu/CustomMenu";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faX } from "@fortawesome/free-solid-svg-icons";

import "./ReservationForm.css";

function ReservationForm({ rightView, setRightView }) {
  const [searchParams] = useSearchParams();
  const customMenu = searchParams.get("customMenu");

  const [toasts, setToasts] = useState([]);
  const [hasMenu, setMenu] = useState(customMenu ? true : false);
  const [hasTable, setHasTable] = useState(false);

  const [tables, setTables] = useState([]);
  const [vip, setVip] = useState([]);

  const reservationFormRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(reservationFormRef.current);
    console.log("formRef.current", formData);
    const values = Object.fromEntries(formData.entries());
    console.log("Form Values:", values);
  };

  function ReservationIncludeMenu() {
    return <CustomMenu setToasts={setToasts} />;
  }

  return (
    <Form
      ref={reservationFormRef}
      className="border rounded-3 p-2"
      onSubmit={handleSubmit}
    >
      <Stack gap={2} direction="vertical">
        <h1 className="align-self-center border-bottom">RESERVATION</h1>
        <Row>
          <Col md={6} lg={6}>
            <Form.Group className="" controlId="form-name">
              <Form.Label>
                <span className="ps-2">Your Name</span>
              </Form.Label>
              <Form.Control
                type="text"
                name="form-name"
                placeholder="Enter name..."
                required
              />
            </Form.Group>
          </Col>
          <Col md={6} lg={6}>
            <Form.Group className="" controlId="form-tel">
              <Form.Label>
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
        <Row>
          <Col md={12} lg={12}>
            <Form.Group className="" controlId="form-restaurant">
              <Form.Label>
                <span className="ps-2">Restaurant Location</span>
              </Form.Label>
              <Form.Control
                as="select"
                name="form-restaurant"
                className="custom-select"
                required
              >
                <option value="" defaultValue hidden>
                  Choose Restaurant...
                </option>
                <option value="1">
                  28 Võ Văn Tần, Phường 6, Quận 3, Hồ Chí Minh, Vietnam
                </option>
                <option value="2">
                  997 Đ. Phạm Thế Hiển, Phường 5, Quận 8, Hồ Chí Minh, Vietnam
                </option>
                <option value="3">
                  690 Đ. Quang Trung, Phường 8, Gò Vấp, Hồ Chí Minh, Vietnam
                </option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={8} lg={8}>
            <Row>
              <Form.Label>
                <span className="ps-2">Reservation Date</span>
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
          </Col>
          <Col md={4} lg={4}>
            <Form.Group className="" controlId="form-eat-time">
              <Form.Label className="">Eat Time</Form.Label>
              <Form.Control
                as="select"
                name="form-eat-time"
                className="custom-select"
              >
                <option value="0.5" defaultValue>
                  30 minutes
                </option>
                <option value="1">1 Hour</option>
                <option value="2">2 Hour</option>
                <option value="3">3 Hour</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={8} lg={8}>
            <Button
              variant=""
              size="md"
              className="w-100 d-flex justify-content-start border-white py-0"
            >
              <Form.Group className="" controlId="form-include-table">
                <Form.Check
                  type="checkbox"
                  name="form-include-table"
                  label="Includes Tables and VIP"
                  onClick={() => setHasTable(!hasTable)}
                />
              </Form.Group>
            </Button>
          </Col>
          {hasTable && rightView !== "table" && (
            <Col md={4} lg={4}>
              <Button
                variant="success"
                className="px-3 py-0 align-self-end"
                onClick={() => setRightView("table")}
              >
                View Table <FontAwesomeIcon icon={faArrowRight} size="lg" />
              </Button>
            </Col>
          )}
          {hasTable && rightView === "table" && (
            <Col md={4} lg={4}>
              <Button
                variant="success"
                className="px-3 py-0 align-self-end"
                onClick={() => setRightView("picture")}
              >
                Cancel View <FontAwesomeIcon icon={faX} size="lg" />
              </Button>
            </Col>
          )}
        </Row>
        {hasTable && (
          <Row>
            <Col md={6} lg={6}>
              <Form.Group className="" controlId="form-tables">
                <Form.Label>
                  <span className="ps-2">Tables</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="form-tables"
                  value={tables.length === 0 ? "None" : "Something"}
                  readOnly
                />
              </Form.Group>
            </Col>
            <Col md={6} lg={6}>
              <Form.Group className="" controlId="form-vip">
                <Form.Label>
                  <span className="ps-2">VIP Room</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="form-vip"
                  value={vip.length === 0 ? "None" : "Something"}
                  readOnly
                />
              </Form.Group>
            </Col>
          </Row>
        )}
        <Row>
          <Col md={8} lg={8}>
            <Button
              variant=""
              size="md"
              className="w-100 d-flex justify-content-start border-white py-0"
            >
              <Form.Group className="" controlId="form-include-menu">
                <Form.Check
                  type="checkbox"
                  name="form-include-menu"
                  label="Includes Your Menu"
                  defaultChecked={hasMenu}
                  onClick={() => setMenu(!hasMenu)}
                />
              </Form.Group>
            </Button>
          </Col>
          {/* {hasMenu && rightView !== "menu" && (
            <Col md={4} lg={4}>
              <Button
                variant="success"
                className="px-3 py-0 align-self-end"
                onClick={() => setRightView("menu")}
              >
                View Menu <FontAwesomeIcon icon={faArrowRight} size="lg" />
              </Button>
            </Col>
          )}
          {hasMenu && rightView === "menu" && (
            <Col md={4} lg={4}>
              <Button
                variant="success"
                className="px-3 py-0 align-self-end"
                onClick={() => setRightView("picture")}
              >
                Cancel View <FontAwesomeIcon icon={faX} size="lg" />
              </Button>
            </Col>
          )} */}
        </Row>
        {hasMenu && <ReservationIncludeMenu />}
        <Form.Group>
          <Button variant="warning" type="submit" className="w-100 p-3">
            <span className="fw-bold">Confirm Booking</span>
          </Button>
        </Form.Group>
      </Stack>
    </Form>
  );
}

export default ReservationForm;
