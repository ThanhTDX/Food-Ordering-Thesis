import React, { useEffect, useState } from "react";
import ReservationForm from "../components/reservation/ReservationForm";
import ReservationTableVip from "../components/reservation/ReservationTableVip";

import reservationImage from "./static/img/2f67bc30f37cf8cc1c49e8d51fba0e435555d844-1800x1000.jpg";

import { Container, Row, Col, Image } from "react-bootstrap";

const ReservationPage = () => {
  const [rightView, setRightView] = useState("picture");
  const [tables, setTables] = useState([]);
  const [vips, setVIPs] = useState([]);  

  return (
    <Container>
      <Row className="d-flex justify-content-center align-items-center">
        <Col md={12} lg={5}>
          <ReservationForm
            rightView={rightView}
            setRightView={setRightView}
            tables={tables}
            vips={vips}
          />
        </Col>
        <Col md={12} lg={7}>
          {rightView === "menu" && <>MENU VIEW</>}
          {rightView === "table" && (
            <ReservationTableVip
              tables={tables}
              setTables={setTables}
              vips={vips}
              setVIPs={setVIPs}
            />
          )}
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
