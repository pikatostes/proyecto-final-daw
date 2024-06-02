import React, { useState } from "react";
import { Card, Col, Image, Nav, Row, Spinner } from "react-bootstrap";

const UserDetailPublic = ({ userData }) => {
  return (
    <Card data-bs-theme="dark">
      <Card.Body>
        <Row className="align-items-center">
          <Col xs={12} className="text-center">
            <Image src={userData.avatar} fluid roundedCircle />
            <h2>{userData.username}</h2>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default UserDetailPublic;
