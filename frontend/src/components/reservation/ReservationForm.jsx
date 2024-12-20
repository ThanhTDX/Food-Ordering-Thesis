import axios from "axios";

import React, { useRef, useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { Form, Button, Row, Col, Stack } from "react-bootstrap";
import CustomMenu from "../customMenu/CustomMenu";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faX } from "@fortawesome/free-solid-svg-icons";

import "./ReservationForm.css";
import DateInput from "../DateInput";
import TimeInput from "../TimeInput";
import Message from "../Message";
import { useSelector } from "react-redux";

import userSelector from "../../slices/userSlice";

function DateTimeInput({ setValid }) {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [time, setTime] = useState(new Date().toTimeString().slice(0, 5));
  const [eatTime, setEatTime] = useState("0.5");
  const [dateError, setDateError] = useState("");
  const [timeError, setTimeError] = useState("");

  // useEffect to automatically check whenever eatTime and time changes
  // eatTime + time shouldn't be in the timeRestriction range
  // in this case it is between 22:00 and 6:00
  useEffect(() => {
    const selectedEatTime = parseFloat(eatTime);

    // Restrict time selection between 22:00 and 06:00
    const timeRestriction = (time) => {
      const [hours, minutes] = time.split(":").map(Number);
      // Convert the input time into a number
      const timeInMinutes = hours * 60 + minutes;
      const timeAndEatTimeInMinutes = timeInMinutes + selectedEatTime * 60;
      // Convert to minutes
      const startTime = 22 * 60; // 22:00 in minutes
      const endTime = 6 * 60; // 06:00 in minutes
      // If time is between 22:00 and 06:00, return true
      if (
        timeAndEatTimeInMinutes >= startTime ||
        timeAndEatTimeInMinutes < endTime
      ) {
        return true;
      }
      return false;
    };

    // Restrict time selection between 22:00 and 06:00
    const isTimeInRestrictedRange = timeRestriction(time);
    if (isTimeInRestrictedRange) {
      setTimeError("Time selection between 22:00 and 06:00 is not allowed.");
      setValid(false);
    } else {
      setTimeError("");
      setValid(true);
    }
  }, [eatTime, time, setValid]);

  return (
    <>
      <Stack gap={2} direction="vertical">
        <Row>
          <Col md={8} lg={8}>
            <Row>
              <Form.Label>
                <span className="ps-2">Reservation Date</span>
              </Form.Label>
              <Col md={6} lg={6}>
                <DateInput
                  date={date}
                  setDate={setDate}
                  error={dateError}
                  setError={setDateError}
                />
              </Col>
              <Col md={6} lg={6}>
                <TimeInput
                  eatTime={eatTime}
                  time={time}
                  setTime={setTime}
                  error={timeError}
                  setError={setTimeError}
                />
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
                value={eatTime}
                onChange={(e) => setEatTime(e.target.value)}
              >
                <option value="0.5">30 minutes</option>
                <option value="1">1 Hour</option>
                <option value="2">2 Hours</option>
                <option value="3">3 Hours</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
        {dateError && (
          <div>
            <Message variant="danger">{dateError}</Message>
          </div>
        )}
        {timeError && (
          <div>
            <Message variant="danger">{timeError}</Message>
          </div>
        )}
      </Stack>
    </>
  );
}

function ReservationForm({ rightView, setRightView, tables, vips }) {
  const [searchParams] = useSearchParams();
  const customMenu = searchParams.get("customMenu");
  const [hasMenu, setMenu] = useState(customMenu ? true : false);
  const [hasTable, setHasTable] = useState(false);

  // User Selector for default values
  // const user = useSelector(userSelector);

  // Error useEffect for outputting error
  // and set timeout if anything happens
  const [error, setError] = useState("");
  useEffect(() => {
    if (error) {
      console.error(error);
    }
    setTimeout(() => {
      setError("");
    }, 3000);
  }, [error]);

  // Reservation form Data
  const navigate = useNavigate();
  const reservationFormRef = useRef(null);
  const [formIsValid, setValid] = useState(true);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formIsValid) {
      setError("User Form error: Invalid Time Input");
    }
    const formData = new FormData(reservationFormRef.current);
    const values = Object.fromEntries(formData.entries());
    console.log("Form Values:", values);
    const postReservation = async () => {
      try {
        const response = await axios.post(
          "/api/reservation/create/",
          // this is so inconsistent if you look at naming conventions
          // for that I'll say python uses snake_case
          // while js uses camelCase
          {
            name: values["form-name"],
            phoneNumber: values["form-tel"],
            restaurant: values["form-restaurant"],
            eatTime: values["form-eat-time"],
            date: values["form-date"],
            time: values["form-time"],
            // user: user ? user.login : null,
            tables: tables,
            vips: vips,
            menu: {
              items: [],
              combos: [],
            },
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        // # Check if response status is successful
        // => Throws
        if (response.status === 200) {
        }
        // navigate(`/user/reservation/${response.id}`)
      } catch (err) {
        setError(err);
      }
    };

    postReservation();
  };

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
                pattern="[\+0-9\-\(\)\s]*" // Allows digits, spaces, plus sign, dashes, and parentheses
                title="Phone number can contain only digits, spaces, +, -, and ()"
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
        <DateTimeInput setValid={setValid} />
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
                  onClick={() => {
                    setHasTable(!hasTable);
                    setRightView("table");
                  }}
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
                  value={tables.length === 0 ? "None" : tables.join(", ")}
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
                  value={vips.length === 0 ? "None" : vips.join(", ")}
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
        {/* {hasMenu && <ReservationIncludeMenu />} */}
        <Form.Group>
          <Button variant="warning" type="submit" className="w-100 p-3">
            <span className="fw-bold">Confirm Booking</span>
          </Button>
        </Form.Group>
        <div>
          {error && (
            <Message variant={"danger"}>
              There is an error confirming your order
            </Message>
          )}
        </div>
      </Stack>
    </Form>
  );
}

export default ReservationForm;
