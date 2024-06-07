import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { newPiece, newPieceDetail } from "../../pieceUtils";

const PieceForm = ({ piece = null, pieceDetail = false }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "", // Aquí se almacenará el ID de la categoría seleccionada
    categories: [], // Agregamos un estado para almacenar las categorías
    color: "", // Aquí se almacenará el ID del color seleccionado
    colors: [], // Agregamos un estado para almacenar los colores
    price: "",
    stock: "",
    image: null, // Agregamos un estado para almacenar la imagen
  });

  useEffect(() => {
    if (piece) {
      const { name, description, category } = piece;
      setFormData((prevFormData) => ({
        ...prevFormData,
        name,
        description,
        category,
      }));
    }
  }, [piece]);

  useEffect(() => {
    const fetchCategoriesAndColors = async () => {
      try {
        const categoryResponse = await fetch("http://localhost:8000/category");
        if (!categoryResponse.ok) {
          throw new Error("Failed to fetch categories");
        }
        const categoryData = await categoryResponse.json();

        const colorResponse = await fetch("http://localhost:8000/color");
        if (!colorResponse.ok) {
          throw new Error("Failed to fetch colors");
        }
        const colorData = await colorResponse.json();

        setFormData((prevFormData) => ({
          ...prevFormData,
          categories: categoryData,
          colors: colorData,
        }));
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategoriesAndColors();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedCategory = formData.categories.find(
      (category) => category.name === formData.category
    );
    const selectedColor = formData.colors.find(
      (color) => color.name === formData.color
    );

    const dataToSend = new FormData();
    
    if (!pieceDetail) {
      dataToSend.append("name", formData.name);
      dataToSend.append("description", formData.description);
    }
    if (selectedCategory) {
      dataToSend.append("category_id", selectedCategory.id);
    }
    if (pieceDetail) {
      dataToSend.append("piece_id", piece.id);
      if (selectedColor) {
        dataToSend.append("color_id", selectedColor.id);
      }
      dataToSend.append("price", formData.price);
      dataToSend.append("stock", formData.stock);
      if (formData.image) {
        dataToSend.append("image", formData.image);
      }
      newPieceDetail(dataToSend);
    } else {
      newPiece(dataToSend);
    }
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
                readOnly={pieceDetail}
              />
            </Form.Group>

            {!pieceDetail && (
              <Form.Group controlId="formDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Enter piece description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            )}

            <Form.Group controlId="formCategory" className="mt-3">
              <Form.Label>Category</Form.Label>
              <Form.Control
                as="select"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select category...</option>
                {formData.categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            {pieceDetail && (
              <>
                <Form.Group controlId="formColor" className="mt-3">
                  <Form.Label>Color</Form.Label>
                  <Form.Control
                    as="select"
                    name="color"
                    value={formData.color}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select color...</option>
                    {formData.colors.map((color) => (
                      <option key={color.id} value={color.name}>
                        {color.name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="formPrice" className="mt-3">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formStock" className="mt-3">
                  <Form.Label>Stock</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter stock"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formImage" className="mt-3">
                  <Form.Label>Image</Form.Label>
                  <Form.Control
                    type="file"
                    name="image"
                    onChange={handleFileChange}
                    required
                  />
                </Form.Group>
              </>
            )}

            <Button variant="primary" type="submit" className="mt-3">
              {piece
                ? "Update Piece"
                : pieceDetail
                ? "Add Piece Detail"
                : "Create Piece"}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default PieceForm;
