import React from 'react'
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer class="bg-dark text-center text-lg-start text-white mt-4">
      <Container class="p-4">
        <Row>
          <Col md={6} lg={3}>
            <h5 class="text-uppercase">See other books</h5>
            <ul class="list-unstyled mb-0">
              <li>
                <a href="#!" class="text-white">
                  <i class="fas fa-book fa-fw fa-sm me-2"></i>Bestsellers
                </a>
              </li>
              <li>
                <a href="#!" class="text-white">
                  <i class="fas fa-book fa-fw fa-sm me-2"></i>All books
                </a>
              </li>
              <li>
                <a href="#!" class="text-white">
                  <i class="fas fa-user-edit fa-fw fa-sm me-2"></i>Our authors
                </a>
              </li>
            </ul>
          </Col>
          <Col md={6} lg={3} className="offset-lg-6 text-end">
            <h5 class="text-uppercase">Write to us</h5>
            <ul class="list-unstyled">
              <li>
                <a href="#!" class="text-white">
                  <i class="fas fa-at fa-fw fa-sm me-2"></i>Help in purchasing
                </a>
              </li>
              <li>
                <a href="#!" class="text-white">
                  <i class="fas fa-shipping-fast fa-fw fa-sm me-2"></i>Check the
                  order status
                </a>
              </li>
              <li>
                <a href="#!" class="text-white">
                  <i class="fas fa-envelope fa-fw fa-sm me-2"></i>Join the
                  newsletter
                </a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
      <div class="text-center p-3">© 2024 Copyright: Nguyen Duy Thanh</div>
    </footer>
  );
}

export default Footer