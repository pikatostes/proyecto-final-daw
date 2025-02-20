import React, { useState, useEffect } from "react";
import { Form, Button, Modal, Image, Col, Row } from "react-bootstrap";
import AvatarGallery from "../../AvatarGallery";
import { updateUser } from "./userAdminUtils";

const UserEditForm = ({ userData, onClose }) => {
  const [formData, setFormData] = useState({
    id: userData.id,
    username: userData.username,
    roles: userData.roles,
    avatar: userData.avatar,
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(userData.avatar);
  const [images, setImages] = useState({});

  useEffect(() => {
<<<<<<< HEAD
    fetch(import.meta.env.VITE_API_URL + "/images")
      .then(response => response.json())
      .then(data => setImages(data))
      .catch(error => console.error("Error fetching images:", error));
=======
    fetch("http://localhost:8000/images")
      .then((response) => response.json())
      .then((data) => setImages(data))
      .catch((error) => console.error("Error fetching images:", error));
>>>>>>> 8829acdc65f948c75a6fbfd5366b86948bb9b779
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "avatar" && files && files[0]) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (e) => setPreviewImage(e.target.result);
      reader.readAsDataURL(file);
      setFormData({ ...formData, avatar: file }); // Aquí asignamos el archivo
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleImageClick = (imageName) => {
    setSelectedImage(imageName);
<<<<<<< HEAD
    setPreviewImage(import.meta.env.VITE_API_URL + `/images/${imageName}`);
    setFormData({ ...formData, avatar: imageName });
=======
    const imageUrl = `http://localhost:8000/images/${imageName}`;
    setPreviewImage(imageUrl);
    setFormData({ ...formData, avatar: imageUrl }); // Aquí asignamos la URL
>>>>>>> 8829acdc65f948c75a6fbfd5366b86948bb9b779
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataWithFile = new FormData();

    // Verificamos si avatar es una URL o un archivo
    if (
      typeof formData.avatar === "string" &&
      formData.avatar.startsWith("http")
    ) {
      formDataWithFile.append("avatarUrl", formData.avatar);
    } else {
      formDataWithFile.append("avatar", formData.avatar);
    }

    for (const key in formData) {
      if (key !== "avatar") {
        // Ya hemos manejado avatar por separado
        formDataWithFile.append(key, formData[key]);
      }
    }

    updateUser(formDataWithFile);
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
