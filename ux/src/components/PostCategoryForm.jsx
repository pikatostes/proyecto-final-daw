import React, { useState } from "react";
import { Modal, Form, Button, Image, Col, Row } from "react-bootstrap";
import { updatePostCategory, createPostCategory } from "./postUtils"; // Asumiendo que existe una función createPostCategory

const PostCategoryForm = ({ postCategory, onSave, onCancel }) => {
  const [categoryName, setCategoryName] = useState(postCategory ? postCategory.name : "");
  const [newCategoryImage, setNewCategoryImage] = useState(null);

  const handleNameChange = (event) => {
    setCategoryName(event.target.value);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setNewCategoryImage(file); // Guardar el archivo directamente
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Verificar si hay una nueva imagen seleccionada, de lo contrario, utilizar la imagen actual
    const imageToSend = newCategoryImage ? newCategoryImage : postCategory.image;

    const categoryData = { name: categoryName, image: imageToSend };

    if (postCategory) {
      // Si postCategory está definido, estamos editando
      await updatePostCategory({ ...postCategory, ...categoryData });
    } else {
      // Si postCategory no está definido, estamos creando
      await createPostCategory(categoryData);
    }
    onSave(categoryData);
  };

  return (
    <Modal show={true} onHide={onCancel} size="xl" centered>
      <Modal.Header closeButton>
        <Modal.Title>{postCategory ? "Edit" : "Create"} Post Category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="categoryName">
            <Form.Label>Category Name</Form.Label>
            <Form.Control
              type="text"
              value={categoryName}
              onChange={handleNameChange}
            />
          </Form.Group>
          <Form.Group controlId="categoryImage">
            <Form.Label>Category Image</Form.Label>
            <br />
            <Row className="d-flex justify-content-center align-items-center">
              {postCategory && postCategory.image && (
                <Col xs={6}>
                  <Image src={postCategory.image} fluid width={200} />
                </Col>
              )}
              {newCategoryImage && (
                <Col xs={6}>
                  <Image src={URL.createObjectURL(newCategoryImage)} fluid width={200} /> {/* Usar createObjectURL para mostrar la vista previa */}
                </Col>
              )}
            </Row>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </Form.Group>
          <Modal.Footer>
            <Button variant="primary" type="submit">
              Save
            </Button>
            <Button variant="secondary" onClick={onCancel}>
              Cancel
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default PostCategoryForm;
