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
        <Row className="w-100">
          <Col>
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
        </Row>

        <Row className="mt-2 w-100">
          <Col className="text-center">
            <p>
              Created by Alejandro Rios as the final project for DAW. Check out
              the source code on{" "}
              <a
                href="https://github.com/pikatostes/proyecto-final-daw"
                className="text-light"
              >
                <Github /> GitHub
              </a>
              .
            </p>
          </Col>
        </Row>
        <Row className="mt-3 w-100">
          <Col className="text-center">
            &copy; 2023 Brickpoint. All Rights Reserved.
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
};

export default FooterComponent;
