import React, { useState } from "react";
import { Card, Col, Image, Nav, Row, Spinner } from "react-bootstrap";

const UserDetailPublic = ({ userData }) => {
  return (
    <Card data-bs-theme="dark">
      <Card.Body>
        <Row className="align-items-center">
          <Col xs={6}>
            <Image src={userData.avatar} fluid roundedCircle />
          </Col>
          <Col xs={6}>
            <h2>{userData.username}</h2>
          </Col>
        </Row>
        <Row>
          <Nav
            justify
            variant="pills"
            className="flex-md-column flex-sm-row mt-2"
          >
            <Nav.Item>
              <Nav.Link eventKey="profile">My Info</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="billingInfo">Billing Info</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="orders">Orders</Nav.Link>
            </Nav.Item>
          </Nav>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default UserDetailPublic;
