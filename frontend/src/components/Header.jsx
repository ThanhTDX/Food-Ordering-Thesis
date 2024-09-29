import React from "react";
import { Container, Nav, Navbar, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function Header() {
  return (
    <header className="mb-4">
      <Navbar
        bg="dark"
        variant="dark"
        expand="lg"
        className="bg-body-dark"
        collapseOnSelect
      >
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Traditional Restaurant</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <LinkContainer to="/menu">
                <Nav.Link>
                  <i className="fas fa-shopping-cart"></i> Menu
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/reservation">
                <Nav.Link>
                  Reservation
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/order">
                <Nav.Link>
                  Order
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/login">
                <Nav.Link>
                  <i className="fas fa-user"></i> Login
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
