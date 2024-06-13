// src/components/FooterComponent.jsx
import React from "react";
import { Container, Row, Col, Nav, Navbar } from "react-bootstrap";
import { Facebook, Twitter, Instagram, Github } from "react-bootstrap-icons";
import "bootstrap/dist/css/bootstrap.min.css";

const FooterComponent = () => {
  return (
    <Navbar
      bg="dark"
      variant="dark"
      className="py-4"
      style={{ color: "white" }}
    >
      <Container fluid>
        <Row className="align-items-center w-100">
          <Col xs={12} className="text-center">
            <h5>Contact Us</h5>
            <Nav className="flex-column">
              <Nav.Link
                href="mailto:brickpoint.daw@gmail.com"
                className="text-light"
              >
                brickpoint.daw@gmail.com
              </Nav.Link>
            </Nav>
          </Col>
          <Col xs={12} className="text-center">
            <p>
              Created by Alejandro Rios as the final project for DAW. Check out
              the source code on{" "}
              <br />
              <a
                href="https://github.com/pikatostes/proyecto-final-daw"
                className="text-light"
              >
                <Github /> GitHub
              </a>
              .
            </p>
          </Col>
          <Col xs={12} className="text-center">
            &copy; 2023 Brickpoint. All Rights Reserved.
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
};

export default FooterComponent;
