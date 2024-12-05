import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Nav, Navbar, Row, Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { userSelector, userIsLoggedIn, userLogout } from "../slices/userSlice";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(userSelector);

  const handleLogout = () => {
    dispatch(userLogout);
  };

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
              {userIsLoggedIn && (
                <Dropdown align="end">
                  {/* Dropdown.Toggle to make the Nav.Link clickable */}
                  <Dropdown.Toggle as={Nav.Link} variant="link">
                    Welcome back, {user.userInfo.username}
                  </Dropdown.Toggle>

                  {/* Dropdown.Menu containing the dropdown items */}
                  <Dropdown.Menu>
                    <LinkContainer to="/user/profile">
                      <Dropdown.Item>Profile</Dropdown.Item>
                    </LinkContainer>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )}
              {!userIsLoggedIn && (
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
