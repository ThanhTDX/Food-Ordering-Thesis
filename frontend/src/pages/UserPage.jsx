import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import {
  Container,
  Row,
  Col,
  Card,
  Image,
  Button,
  Accordion,
  Stack,
} from "react-bootstrap";
import Loader from "../components/Loader";
import AccordionCollapse from "react-bootstrap/AccordionCollapse";
import avatar from "./static/img/avatar.svg";

import "./static/css/UserPage.css";

const OrderingSection = ({ orderingExpanded, setOrderingExpanded }) => {
  const [loading, setLoading] = useState(false);
  return loading ? (
    <Loader height={65} width={65} />
  ) : (
    <Accordion
      activeKey={orderingExpanded ? "0" : null}
      onSelect={() => setOrderingExpanded(!orderingExpanded)}
      className="ordering__accordion"
    >
      <Accordion.Item eventKey="0">
        <Accordion.Header>
          <span className="fs-2 fw-bold">Ordering Lists</span>
        </Accordion.Header>
        <Accordion.Body>
          <Stack direction="vertical" gap={1}></Stack>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

const ReservationSection = ({
  reservationExpanded,
  setReservationExpanded,
}) => {
  const [reservation, setReservation] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {});
  return loading ? (
    <Loader height={65} width={65} />
  ) : (
    <Accordion
      activeKey={reservationExpanded ? "0" : null}
      onSelect={() => setReservationExpanded(!reservationExpanded)}
      className="reservation__accordion"
    >
      <Accordion.Item eventKey="0">
        <Accordion.Header>
          <span className="fs-2 fw-bold">Reservation Lists</span>
        </Accordion.Header>
        <Accordion.Body>
          <Stack direction="vertical" gap={1}></Stack>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

const PersonalInfoEdit = () => {

}

const PersonalInfoView = () => {

}

const PersonalInfoSection = () => {
  return (
    <Card>
      <Card.Body>
        <Stack direction="vertical" gap={1}>
          <Row >
            <Col sm={3} class="">
              <h6 class="mb-0 fw-bold fs-6">Username</h6>
            </Col>
            <Col sm={9} class="text-secondary">
              Kenneth Valdez
            </Col>
          </Row>
          <hr className="m-1" />
          <Row>
            <Col sm={3} class="">
              <h6 class="mb-0 fw-bold fs-6">Phone Number</h6>
            </Col>
            <Col sm={9} class="text-secondary">
              Kenneth Valdez
            </Col>
          </Row>
          <hr className="m-1" />
          <Row>
            <Col sm={12}>
              <Button variant="outline-info" className="">
                Edit
              </Button>
              <Button variant="outline-danger" className="ms-2">
                Change Password
              </Button>
            </Col>
          </Row>
          
        </Stack>
      </Card.Body>
    </Card>
  );
};

const InfoCardSection = ({
  reservationExpanded,
  setReservationExpanded,
  orderingExpanded,
  setOrderingExpanded,
}) => {
  return (
    <Card>
      <Card.Body>
        <div className="d-flex flex-column d-flex flex-column align-items-center text-center">
          <Image src={avatar} alt="avatar" width={150} height={150} />
          <div>
            <span className="h4">John Doe</span>
            <p className="text-secondary">aaa</p>
            <p className="text-muted font-size-sm">bbbb</p>
            <Button variant="primary">Follow</Button>
            <Button variant="light" className="btn-outline-primary">
              Follow
            </Button>
          </div>
        </div>
        <hr className="bg-danger border-2 border-top border-danger" />
        <Row className="g-2">
          <Col md={6} lg={6}>
            <Button
              variant="secondary"
              className="text-center w-100"
              onClick={() => setReservationExpanded(!reservationExpanded)}
            >
              <span>Reservation</span>
            </Button>
          </Col>
          <Col md={6} lg={6}>
            <Button
              variant="secondary"
              className="text-center w-100"
              onClick={() => setOrderingExpanded(!orderingExpanded)}
            >
              <span>Ordering</span>
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

const UserPage = () => {
  const [reservationExpanded, setReservationExpanded] = useState(false);
  const [orderingExpanded, setOrderingExpanded] = useState(false);
  return (
    <Container>
      <Row>
        <Col lg={4} className="">
          <InfoCardSection
            reservationExpanded={reservationExpanded}
            setReservationExpanded={setReservationExpanded}
            orderingExpanded={orderingExpanded}
            setOrderingExpanded={setOrderingExpanded}
          />
        </Col>
        <Col lg={8} className="">
          <PersonalInfoSection />
          <ReservationSection
            reservationExpanded={reservationExpanded}
            setReservationExpanded={setReservationExpanded}
          />
          <OrderingSection
            orderingExpanded={orderingExpanded}
            setOrderingExpanded={setOrderingExpanded}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default UserPage;
