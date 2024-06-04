// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import {
  Navbar,
  Nav,
  Button,
  Container,
  Dropdown,
  Image,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../../brickpoint-icon.png"; // Ruta de tu logo
import Cart from "./Cart"; // Importa el componente Cart
import { fetchUserDataUsingToken, logoutUser } from "../pages/userUtils"; // Correctly import the function
import { Cart2, House, People, Person, PersonGear, Shop } from "react-bootstrap-icons";

const NavigationBar = () => {
  const [showCart, setShowCart] = useState(false); // Estado para controlar si se muestra el carrito
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const data = fetchUserDataUsingToken();
      setUserData(data);
    } catch (error) {
      setError(error.message);
    }
  }, []);

  const handleLogout = () => {
    logoutUser();
    window.location.reload();
  };

  return (
    <>
      <Navbar bg="" expand="lg" className="bg-dark navbar-dark fixed-top">
        <Container fluid>
          <Navbar.Brand href="#">
            <img
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="Brickpoint Logo"
            />
            {" Brickpoint"}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto mb-2 mb-lg-0">
              <Nav.Link href="/" className="align-self-center">
                <House /> Home
              </Nav.Link>
              <Nav.Link href="/pieces" className="align-self-center">
                <Shop /> Shop
              </Nav.Link>
              <Nav.Link href="/post" className="align-self-center">
                <People /> Forum
              </Nav.Link>
            </Nav>
            {userData ? (
              <Dropdown data-bs-theme="dark">
                <Dropdown.Toggle variant="primary" className="ms-lg-2">
                  <Image src={userData.avatar} roundedCircle height={25} />{" "}
                  {userData.user}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="/profile">
                    <Person /> Profile
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setShowCart(!showCart)}>
                    <Cart2 /> Cart
                  </Dropdown.Item>
                  {userData.roles.includes("ROLE_ADMIN") && (
                    <Dropdown.Item href="/admin">
                      <PersonGear /> Control Panel
                    </Dropdown.Item>
                  )}
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleLogout}>
                    <Button
                      variant="danger"
                      className="ms-lg-2"
                      onClick={handleLogout}
                    >
                      Log Out
                    </Button>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <>
                <a href="/login">
                  <Button variant="primary" className="ms-lg-2">
                    Log In
                  </Button>
                </a>
                <a href="/register">
                  <Button variant="success" className="ms-lg-2">
                    Register
                  </Button>
                </a>
              </>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* Renderiza el componente Cart con el estado showCart */}
      <Cart show={showCart} setShowCart={setShowCart} />
    </>
  );
};

export default NavigationBar;
