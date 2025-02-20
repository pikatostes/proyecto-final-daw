import React, { useState, useEffect } from "react";
import { Form, Button, Modal, Image, Col, Row } from "react-bootstrap";
import AvatarGallery from "../../AvatarGallery";

const UserEditForm = ({ userData, onClose }) => {
  const [formData, setFormData] = useState(userData);
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(userData.avatar);
  const [images, setImages] = useState({});

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + "/images")
      .then(response => response.json())
      .then(data => setImages(data))
      .catch(error => console.error("Error fetching images:", error));
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "avatar" && files && files[0]) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (e) => setPreviewImage(e.target.result);
      reader.readAsDataURL(file);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleImageClick = (imageName) => {
    setSelectedImage(imageName);
    setPreviewImage(import.meta.env.VITE_API_URL + `/images/${imageName}`);
    setFormData({ ...formData, avatar: imageName });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataWithFile = new FormData();
    formDataWithFile.append("avatar", selectedImage);
    for (const key in formData) {
      formDataWithFile.append(key, formData[key]);
    }
    console.log("Formulario enviado:", formDataWithFile);
    onClose();
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
            <Row>
              <Col xs={6}>
                <h4>Old</h4>
                <Image src={userData.avatar} fluid roundedCircle />
              </Col>
              <Col xs={6}>
                <h4>New</h4>
                {previewImage && (
                  <Image src={previewImage} fluid roundedCircle />
                )}
              </Col>
            </Row>
          </Form.Group>
          <AvatarGallery
            images={images} 
            selectedImage={selectedImage} 
            handleImageClick={handleImageClick} 
          />
          <Button variant="primary" type="submit">
            Guardar Cambios
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default UserEditForm;
