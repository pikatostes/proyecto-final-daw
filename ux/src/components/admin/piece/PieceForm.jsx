import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { newPiece } from "../../pieceUtils";

const PieceForm = ({ piece = null }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "", // Aquí se almacenará el ID de la categoría seleccionada
    categories: [], // Agregamos un estado para almacenar las categorías
  });

  useEffect(() => {
    if (piece) {
      // Si se recibe una pieza, actualizamos el formData solo con los campos necesarios
      const { name, description, category } = piece;
      setFormData({
        name,
        description,
        category,
        categories: [], // Mantenemos las categorías vacías
      });
    }
  }, [piece]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:8000/category");
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        // Almacenamos las categorías en el estado
        setFormData((prevFormData) => ({
          ...prevFormData,
          categories: data,
        }));
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Busca el objeto de categoría correspondiente al nombre seleccionado
    const selectedCategory = formData.categories.find(
      (category) => category.name === formData.category
    );
    // Envía el ID de la categoría en lugar del nombre
    newPiece({
      ...formData,
      category: selectedCategory ? selectedCategory.id : "", // Envía el ID de la categoría o una cadena vacía si no se encuentra la categoría
    });
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <h2>{piece ? "Edit Piece" : "Create Piece"}</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter piece name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formDescription" className="mt-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter piece description"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formCategory" className="mt-3">
              <Form.Label>Category</Form.Label>
              <Form.Control
                as="select" // Cambiamos el tipo de control a "select"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select category...</option>
                {/* Mapeamos las categorías para crear las opciones */}
                {formData.categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-3">
              {piece ? "Update Piece" : "Create Piece"}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default PieceForm;
