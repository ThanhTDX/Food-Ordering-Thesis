import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-dark text-center text-lg-start text-white mt-4">
      <Container className="p-4">
        <Row>
          <Col md={6} lg={3}>
            <h5 className="text-uppercase text-end fw-bold">Thành's Deli</h5>
            <ul className="list-unstyled mb-0">
              <li>
                <Link to={`/`} className="text-white">
                  <i className="fas fa-book fa-fw fa-sm me-2"></i>Home
                </Link>
              </li>
              <li>
                <Link to={`/reservation`} className="text-white">
                  <i className="fas fa-book fa-fw fa-sm me-2"></i>Reservation
                </Link>
              </li>
              <li>
                <Link to={`/order`} className="text-white">
                  <i className="fas fa-user-edit fa-fw fa-sm me-2"></i>Ordering
                </Link>
              </li>
            </ul>
          </Col>
          <Col md={6} lg={4} className="offset-lg-5 text-end">
            <h5 className="text-uppercase text-start fw-bold">Locations</h5>
            <ul className="list-unstyled">
              <li>
                <i className="fas fa-at fa-fw fa-sm me-2"></i>28 Võ Văn Tần,
                Phường 6, Quận 3
              </li>
              <li>
                <i className="fas fa-shipping-fast fa-fw fa-sm me-2"></i>997 Đ.
                Phạm Thế Hiển, Phường 5, Quận 8
              </li>
              <li>
                <i className="fas fa-envelope fa-fw fa-sm me-2"></i>690 Đ. Quang
                Trung, Phường 8, Gò Vấp
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
      <div className="text-center p-3">© 2024 Copyright: Nguyen Duy Thanh</div>
    </footer>
  );
};

export default Footer;
