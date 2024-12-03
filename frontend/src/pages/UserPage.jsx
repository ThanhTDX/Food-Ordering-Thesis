import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import {
  Container,
  Row,
  Col,
  Card,
  Image,
  Button,
  Dropdown,
} from "react-bootstrap";

const UserPage = () => {
  return (
    <Container>
      <div className="user-main-body">
        <Row>
          <Col lg={4}>
            <Card>
              <Card.Body>
                <div className="d-flex flex-column d-flex flex-column align-items-center text-center">
                  <Image></Image>
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
                <hr class="bg-danger border-2 border-top border-danger" />
                <Row className="g-2">
                  <Col md={6} lg={12}>
                    <Button variant="secondary" className="text-center w-100">
                      <span>Reservation</span>
                    </Button>
                  </Col>
                  <Col md={6} lg={12}>
                    <Button variant="secondary" className="text-center w-100">
                      <span>Ordering</span>
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={8}>
            <Card>
              <Card.Header>
                <div className="float-right">
                  <Dropdown>
                    <Dropdown.Toggle id="dropdown-autoclose-true">
                      <FontAwesomeIcon icon={faEllipsis} />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item href="#">Menu Item</Dropdown.Item>
                      <Dropdown.Item href="#">Menu Item</Dropdown.Item>
                      <Dropdown.Item href="#">Menu Item</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </Card.Header>
            </Card>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default UserPage;
