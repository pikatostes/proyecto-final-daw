import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Spinner,
  InputGroup,
  FloatingLabel,
} from "react-bootstrap";
import { loginUser, saveUserSession } from "./userUtils";
import { Eye, EyeSlash, Lock, Person } from "react-bootstrap-icons";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true); // Activar loading al enviar los datos

    try {
      const data = await loginUser(formData);
      saveUserSession(data);

      // Redirigir al usuario a la página principal
      window.location.href = "/";
      setIsLoading(false);
    } catch (error) {
      console.error("Error:", error.message);
    } finally {
      setIsLoading(false); // Desactivar loading después de completar
    }
  };
  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title className="text-center mb-4">Log In</Card.Title>
              <Form onSubmit={handleSubmit} method="POST">
                <InputGroup className="mb-3">
                  <InputGroup.Text>
                    <Person />
                  </InputGroup.Text>
                  <FloatingLabel controlId="formBasicUsername" label="Username">
                    <Form.Control
                      type="text"
                      placeholder="Enter username"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      disabled={isLoading}
                    />
                  </FloatingLabel>
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Text>
                    <Lock />
                  </InputGroup.Text>
                  <FloatingLabel controlId="formBasicPassword" label="Password">
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      disabled={isLoading}
                    />
                  </FloatingLabel>
                  <Button
                    variant="outline-secondary"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeSlash /> : <Eye />}
                  </Button>
                </InputGroup>
                <Button variant="primary" type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  ) : (
                    "Log In"
                  )}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
