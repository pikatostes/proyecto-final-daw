import React, { useState } from "react";
import { Navbar, Nav, Button, Container, Dropdown, Image } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../../brickpoint-icon.png"; // Ruta de tu logo
import Cart from "./Cart"; // Importa el componente Cart
import { fetchUserDataUsingToken, logoutUser } from "../pages/userUtils"; // Importa correctamente la función
import { Cart2, House, People, Person, PersonGear, Shop } from "react-bootstrap-icons";

const NavigationBar = () => {
  const [showCart, setShowCart] = useState(false); // Estado para controlar si se muestra el carrito
  const [error, setError] = useState(null);

  // Obtener datos del usuario de localStorage de manera sincrónica
  let userData = null;
  try {
    userData = fetchUserDataUsingToken();
  } catch (err) {
    console.error(err.message);
  }

  const handleLogout = () => {
    logoutUser();
    window.location.reload();
  };

  return (
    <>
      <Navbar bg="" expand="lg" className="bg-dark navbar-dark fixed-top">
        <Container fluid>
          <Navbar.Brand href="/">
            <Image
              src={logo}
              width={30}
              height={30}
              className="d-inline-block align-top"
              alt="Brickpoint Logo"
              fluid
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
                  <Dropdown.Item>
                    <Button variant="danger" className="w-100" onClick={handleLogout}>
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
