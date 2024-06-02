import React, { useState } from "react";
import { Card, Col, Image, Nav, Row, Spinner } from "react-bootstrap";
import { Star } from "react-bootstrap-icons";

const UserDetailPublic = ({ userData }) => {
  return (
    <Card data-bs-theme="dark">
      <Card.Body>
        <Row className="align-items-center">
          <Col xs={6} md={12} className="text-center">
            <Image src={userData.avatar} fluid roundedCircle />
          </Col>
          <Col xs={6} md={12} className="text-center">
            <h2>{userData.username}</h2>
            {userData.role.includes("ROLE_ADMIN") && (
              <h3 className="bg-warning text-light rounded">
                <Star /> ADMIN
              </h3>
            )}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default UserDetailPublic;
