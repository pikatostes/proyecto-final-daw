import React, { useState, useEffect } from "react";
import { Container, Form, Button, Row, Col, Card, FloatingLabel, InputGroup, Image } from "react-bootstrap";
import { Envelope, Person, Lock, Eye, EyeSlash } from 'react-bootstrap-icons';
import { registerUser, loginUser, saveUserSession } from "./userUtils";
import './css/Register.css'; // Archivo CSS para estilos personalizados

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    avatar: null,
  });

  const [passwordErrors, setPasswordErrors] = useState([]);
  const [passwordValid, setPasswordValid] = useState(false);
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [images, setImages] = useState({});

  useEffect(() => {
    // Fetch images from localhost:8000
    const fetchImages = async () => {
      try {
        const response = await fetch("http://localhost:8000/images");
        const data = await response.json();
        setImages(data);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = name === "avatar" ? e.target.files[0] : e.target.value;

    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "password") {
      validatePassword(value);
    }

    if (name === "confirmPassword") {
      setPasswordMatchError(value !== formData.password);
    }
  };

  const validatePassword = (password) => {
    const errors = [];
    if (password.length < 6) errors.push("Password must be at least 6 characters long.");
    if (!/[A-Z]/.test(password)) errors.push("Password must contain at least one uppercase letter.");
    if (!/[0-9]/.test(password)) errors.push("Password must contain at least one number.");
    if (!/[!@#$%^&*]/.test(password)) errors.push("Password must contain at least one special character.");
    setPasswordErrors(errors);
    setPasswordValid(errors.length === 0);
  };

  const handleImageClick = (imageName) => {
    setFormData({
      ...formData,
      avatar: imageName,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordErrors.length > 0 || passwordMatchError) {
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("email", formData.email);
      formDataToSend.append("username", formData.username);
      formDataToSend.append("password", formData.password);
      if (formData.avatar instanceof File) {
        formDataToSend.append("avatar", formData.avatar);
      } else {
        formDataToSend.append("avatarUrl", `http://localhost:8000/images/${formData.avatar}`);
      }

      await registerUser(formDataToSend);

      const data = await loginUser(formData);

      saveUserSession(data);

      // Redirigir al usuario a la página principal
      window.location.href = "/";
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title className="text-center">Register</Card.Title>
              <Form onSubmit={handleSubmit}>
                <InputGroup className="mb-3">
                  <InputGroup.Text>
                    <Envelope />
                  </InputGroup.Text>
                  <FloatingLabel controlId="formBasicEmail" label="Email">
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </FloatingLabel>
                </InputGroup>

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
                      onChange={handleChange}
                    />
                  </FloatingLabel>
                </InputGroup>

                <InputGroup className="mb-3">
                  <InputGroup.Text className={passwordValid ? 'text-success' : ''}>
                    <Lock />
                  </InputGroup.Text>
                  <FloatingLabel controlId="formBasicPassword" label="Password">
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className={passwordValid ? 'is-valid' : ''}
                    />
                  </FloatingLabel>
                  <Button variant="outline-secondary" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeSlash /> : <Eye />}
                  </Button>
                </InputGroup>

                <InputGroup className="mb-3">
                  <InputGroup.Text className={!passwordMatchError && formData.confirmPassword ? 'text-success' : ''}>
                    <Lock />
                  </InputGroup.Text>
                  <FloatingLabel controlId="formConfirmPassword" label="Confirm Password">
                    <Form.Control
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm Password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={!passwordMatchError && formData.confirmPassword ? 'is-valid' : ''}
                    />
                  </FloatingLabel>
                  <Button variant="outline-secondary" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                    {showConfirmPassword ? <EyeSlash /> : <Eye />}
                  </Button>
                </InputGroup>

                {passwordErrors.length > 0 && (
                  <ul className="text-danger">
                    {passwordErrors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                )}

                {passwordMatchError && (
                  <p className="text-danger">Passwords do not match.</p>
                )}

                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label>Add an Avatar picture</Form.Label>
                  <Form.Control
                    type="file"
                    name="avatar"
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group controlId="avatarSelection" className="mb-3">
                  <Form.Label>Select an Avatar from gallery</Form.Label>
                  <Container className="d-flex flex-wrap" fluid style={{ maxHeight: "35vh", overflowX: "auto" }}>
                    {Object.entries(images).map(([key, imageName]) => (
                      <Image
                        key={key}
                        roundedCircle
                        src={`http://localhost:8000/images/${imageName}`}
                        onClick={() => handleImageClick(imageName)}
                        style={{ cursor: "pointer" }}
                        width={63}
                        fluid
                        className="m-1"
                      />
                    ))}
                  </Container>
                </Form.Group>

                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
