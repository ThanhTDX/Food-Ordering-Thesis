import React, { useState } from "react";
import ReservationForm from "../components/reservation/ReservationForm";

import reservationImage from "./static/img/2f67bc30f37cf8cc1c49e8d51fba0e435555d844-1800x1000.jpg"

import { Container, Row, Col, Image } from "react-bootstrap";

const ReservationPage = () => {
  const [rightView, setRightView] = useState("picture");

  return (
    <Container>
      <Row className="d-flex justify-content-center align-items-center">
        <Col md={12} lg={5}>
          <ReservationForm rightView={rightView} setRightView={setRightView} />
        </Col>
        <Col md={12} lg={7}>
          {rightView === "menu" && <>MENU VIEW</>}
          {rightView === "table" && <>TABLE VIEW</>}
          {rightView === "picture" && (
            <Container className="p-0">
              <Image
                src={reservationImage}
                alt="Table Image"
                rounded // Optional: adds rounded corners
                fluid // Optional: makes the image responsive
              />
            </Container>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ReservationPage;
