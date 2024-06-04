import React, { useState } from "react";
import { Form, Button, Modal, Image, Col, Row } from "react-bootstrap";

const UserEditForm = ({ userData, onClose }) => {
  const [formData, setFormData] = useState(userData);
  const [previewImage, setPreviewImage] = useState(null); // State for preview image

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "avatar") {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (e) => setPreviewImage(e.target.result); // Update preview image
      reader.readAsDataURL(file);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Append the selected file to formData (if needed)
    const formDataWithFile = new FormData();
    formDataWithFile.append("avatar", files[0]); // Assuming you want to send the file
    for (const key in formData) {
      formDataWithFile.append(key, formData[key]);
    }
    // Lógica para enviar el formulario editado (using formDataWithFile if necessary)
    console.log("Formulario enviado:", formDataWithFile);
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
              as="select"
              name="roles"
              value={formData.roles}
              onChange={handleChange}
            >
              <option value="ROLE_ADMIN">ROLE_ADMIN</option>
              <option value="ROLE_USER">ROLE_USER</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formAvatar">
            <Form.Label>Avatar</Form.Label>
            <Form.Control type="file" name="avatar" onChange={handleChange} />
            <Row>
              <Col xs={6}>
                <h4>Old</h4>
                <Image src={formData.avatar} fluid roundedCircle />
              </Col>
              <Col xs={6}>
                <h4>New</h4>
                {previewImage && (
                  <Image src={previewImage} fluid roundedCircle />
                )}
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
