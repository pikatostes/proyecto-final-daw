import React from "react";
import { Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom"; // Importa NavLink desde react-router-dom

const CustomNavbar = () => {
  return (
    <Navbar bg="dark" expand="lg" variant="dark" fixed="top">
      <Navbar.Brand href="/">Brickpoint</Navbar.Brand> {/* Cambia el enlace a / */}
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <NavDropdown title="Piezas" id="piecesDropdown">
            <NavDropdown.Item as={NavLink} to="/pieces">Browse</NavDropdown.Item> {/* Cambia el enlace a /pieces */}
            <NavDropdown.Item href="#categoria2">Categoría 2</NavDropdown.Item>
            <NavDropdown.Item href="#categoria3">Categoría 3</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="Foro" id="forumDropdown">
            <NavDropdown.Item href="#categoria1">Categoría 1</NavDropdown.Item>
            <NavDropdown.Item href="#categoria2">Categoría 2</NavDropdown.Item>
            <NavDropdown.Item href="#categoria3">Categoría 3</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Nav className="mx-auto">
          <Button variant="outline-primary" className="mr-2">Log In</Button>
          <Button variant="primary">Register</Button>
        </Nav>
        <div className="ml-auto"></div>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default CustomNavbar;
