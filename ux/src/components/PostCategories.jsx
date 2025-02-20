import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Spinner,
  Alert,
  Button,
} from "react-bootstrap";
import ThreePointsButton from "./ThreePointsButton";
import { deletePostCategory } from "./postUtils";
import PostCategoryForm from "./PostCategoryForm";

const PostCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [showNewCategoryForm, setShowNewCategoryForm] = useState(false); // Nuevo estado

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_API_URL + "/post/category");
        if (!response.ok) {
          throw new Error("Error fetching categories");
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleNewCategory = () => {
    setShowNewCategoryForm(true); // Mostrar el formulario al hacer clic en "New Category"
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
  };

  const handleDeleteCategory = (category) => {
    deletePostCategory(category);
    console.log("Delete category:", category);
  };

  const handleSaveEdit = (editedCategory) => {
    // Aquí puedes implementar la lógica para guardar los cambios de edición
    console.log("Edited category:", editedCategory);
    // Una vez guardados los cambios, cierra el formulario de edición
    setEditingCategory(null);
  };

  const handleCancelEdit = () => {
    // Cancela la edición y cierra el formulario de edición
    setEditingCategory(null);
  };

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container>
      <h3 className="mb-4">Post Categories</h3>
      <Row className="justify-content-center">
        <Col xs={12}>
          <Button variant="primary" onClick={handleNewCategory}>
            New Category
          </Button>
        </Col>
      </Row>
      {showNewCategoryForm && ( // Mostrar el formulario de nueva categoría si showNewCategoryForm es true
        <PostCategoryForm
          onSave={() => setShowNewCategoryForm(false)} // Cerrar el formulario al guardar
          onCancel={() => setShowNewCategoryForm(false)} // Cerrar el formulario al cancelar
        />
      )}
      <Row>
        {categories.map((category) => (
          <Col key={category.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <Card>
              <Card.Body>
                <Row>
                  <Col xs={10}>
                    <Card.Img variant="top" src={category.image} />
                    <Card.Title>{category.name}</Card.Title>
                  </Col>
                  <Col xs={2}>
                    <ThreePointsButton
                      target={category}
                      onEdit={handleEditCategory}
                      onDelete={handleDeleteCategory}
                    />
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      {/* Renderiza el formulario de edición si hay una categoría en edición */}
      {editingCategory && (
        <PostCategoryForm
          postCategory={editingCategory}
          onSave={handleSaveEdit}
          onCancel={handleCancelEdit}
        />
      )}
    </Container>
  );
};

export default PostCategories;
