// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { Card, Col, Form, Image, Row, Spinner, Button } from "react-bootstrap";
import { fetchUserData, updateUserDetails } from "./profileUtil";

const UserDetail = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    const userSession = localStorage.getItem("user_id");
    if (userSession) {
      fetchUserData(userSession)
        .then((data) => {
          setUserData(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          setLoading(false);
        });
    }
  }, []);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleAvatarChange = (event) => {
    setAvatar(event.target.files[0]);
  };

  const handleSubmit = () => {
    updateUserDetails(userData.id, username, email, avatar)
      .then((data) => {
        console.log(data);
        // Aquí podrías manejar la respuesta, por ejemplo, mostrar un mensaje de éxito
      })
      .catch((error) => {
        console.error("Error updating user data:", error);
      });
  };

  return (
    <Card data-bs-theme="dark">
      <Card.Header>User Profile</Card.Header>
      <Card.Body>
        {loading ? (
          <div className="d-flex justify-content-center align-items-center">
            <Spinner animation="border" />
          </div>
        ) : (
          <Row className="align-items-center justify-content-center">
            <Col sm={3} className="text-center">
              <Image src={userData.avatar} roundedCircle fluid />
            </Col>
            <Col sm={9}>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Change User</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={userData.username}
                  value={username}
                  onChange={handleUsernameChange}
                />
                <Form.Label>Change Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder={userData.email}
                  value={email}
                  onChange={handleEmailChange}
                />
                <Form.Label>Change Avatar</Form.Label>
                <Form.Control type="file" onChange={handleAvatarChange} />
              </Form.Group>
              <Button variant="primary" onClick={handleSubmit}>
                Save Changes
              </Button>
            </Col>
          </Row>
        )}
      </Card.Body>
    </Card>
  );
};

export default UserDetail;
