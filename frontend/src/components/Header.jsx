import React from "react";
import { Container, Nav, Navbar, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { userSelector } from "../slices/userSlice";

function Header() {

  const user = useSelector(userSelector)

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
            <Navbar.Brand>Thành's Deli</Navbar.Brand>
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
                <Nav.Link>Reservation</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/order">
                <Nav.Link>Order</Nav.Link>
              </LinkContainer>
              {user && (
                <LinkContainer to="/user/profile">
                  <Nav.Link>
                    Welcome back, {user.login.username} 
                  </Nav.Link>
                </LinkContainer>
              )}
              {!user && (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user"></i> Login
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
