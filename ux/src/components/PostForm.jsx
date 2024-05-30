import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Image, Col, Row, Alert } from "react-bootstrap";
import { createNewPost, updatePost, fetchCategories } from "./postUtils"; // Importar updatePost y fetchCategories

const PostForm = ({ show, handleClose, post }) => {
  const [formData, setFormData] = useState({
    title: post ? post.title : "",
    description: post ? post.description : "",
    image: null,
    category: post ? post.category.id : "", // Ajustamos para que tome el ID de la categoría
    user_id: localStorage.getItem("user_id"),
  });

  const [categories, setCategories] = useState([]);
  const [imagePreview, setImagePreview] = useState(post ? post.image : null); // Ajustamos para que use la imagen del post
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files.length > 0) {
      const file = files[0];
      setFormData((prevData) => ({ ...prevData, image: file }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (post) {
        await updatePost(post.id, formData);
      } else {
        await createNewPost(formData);
      }
      handleClose();
      // Limpiar campos del formulario
      setFormData({
        title: "",
        description: "",
        image: null,
        category: "",
        user_id: localStorage.getItem("user_id"),
      });
      setImagePreview(null);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    const fetchCategoriesData = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchCategoriesData();
  }, []);

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>{post ? "Editar Post" : "Crear Nuevo Post"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group controlId="formTitle">
                <Form.Label>Título</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese el título"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formContent">
                <Form.Label>Contenido</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Ingrese el contenido"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formCategory">
                <Form.Label>Categoría</Form.Label>
                <Form.Select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccionar categoría</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Seleccionar imagen</Form.Label>
                <Form.Control
                  type="file"
                  name="image"
                  onChange={handleChange}
                  required={!post}
                />
                {imagePreview && (
                  <Image
                    src={imagePreview}
                    alt="Vista previa de la imagen"
                    fluid
                    width={300}
                    className="mt-3"
                  />
                )}
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          {post ? "Guardar Cambios" : "Crear Post"}
        </Button>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PostForm;
