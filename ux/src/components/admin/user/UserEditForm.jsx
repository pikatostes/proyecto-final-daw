import React, { useState } from "react";
import { Form, Button, Modal, Image, Col, Row } from "react-bootstrap";

const UserEditForm = ({ userData, onClose }) => {
  const [formData, setFormData] = useState(userData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para enviar el formulario editado
    console.log("Formulario enviado:", formData);
    onClose(); // Cerrar el modal después de enviar el formulario
  };

  return (
    <Modal
      show={true}
      onHide={onClose}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Editar Usuario</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formRoles">
            <Form.Label>Roles</Form.Label>
            <Form.Control
              type="text"
              name="roles"
              value={formData.roles}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formAvatar">
            <Form.Label>Avatar</Form.Label>
            <Form.Control
              type="file"
              name="avatar"
              value={""}
              onChange={handleChange}
            />
            <Row>
              <Col xs={6}>
                <h4>Old</h4>
                <Image src={formData.avatar} fluid roundedCircle />
              </Col>
              <Col xs={6}>
                <h4>New</h4>
                <Image src={formData.avatar} fluid roundedCircle />
              </Col>
            </Row>
          </Form.Group>
          <Button variant="primary" type="submit">
            Guardar Cambios
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default UserEditForm;
