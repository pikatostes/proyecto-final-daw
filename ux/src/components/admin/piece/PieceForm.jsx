import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

const PieceForm = ({ piece = null, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    color: "",
    category: "",
    quantity: 0,
    description: ""
  });

  useEffect(() => {
    if (piece) {
      setFormData({
        name: piece.name,
        color: piece.color,
        category: piece.category,
        quantity: piece.quantity,
        description: piece.description
      });
    }
  }, [piece]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
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

            <Form.Group controlId="formColor" className="mt-3">
              <Form.Label>Color</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter piece color"
                name="color"
                value={formData.color}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formCategory" className="mt-3">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter piece category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formQuantity" className="mt-3">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter piece quantity"
                name="quantity"
                value={formData.quantity}
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
