// PieceOptions.jsx
import React, { useState, useEffect } from "react";
import ColorCarousel from "./ColorCarousel";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";

const PieceOptions = ({ pieceData, onClose }) => {
  const [fullPieceData, setFullPieceData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [maxQuantity, setMaxQuantity] = useState(1);
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    const fetchFullPieceData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `http://localhost:8000/piece/${pieceData.id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch full piece data");
        }
        const data = await response.json();
        setFullPieceData(data);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchFullPieceData();
  }, [pieceData]);

  useEffect(() => {
    if (selectedColor) {
      const colorDetails = fullPieceData.colors.find(
        (color) => color.name === selectedColor.name
      );
      setMaxQuantity(colorDetails.stock); // Establecer el máximo como el stock actual del color seleccionado
      if (quantity > colorDetails.stock) {
        setQuantity(colorDetails.stock); // Si la cantidad excede el stock, ajustarla al stock máximo
      }
    }
  }, [pieceData, selectedColor, fullPieceData, quantity]);

  const handleAddToCart = () => {
    if (selectedColor) {
      const totalPrice = selectedColor.price * quantity;
      const newItem = {
        name: fullPieceData.name,
        color: selectedColor.name,
        quantity: quantity,
        price: totalPrice,
        image: selectedColor.image // Agregar la URL de la imagen del color correspondiente
      };
      const updatedCart = [...cart, newItem];
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  return (
    <Modal
      show={true}
      onHide={onClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {isLoading
            ? "Loading..."
            : error
            ? "Error"
            : fullPieceData?.name || "No piece data provided."}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {fullPieceData && !isLoading && !error && (
          <Row>
            <Col lg={6}>
              <ColorCarousel colors={pieceData.colors} />
            </Col>
            <Col lg={6}>
              <Form>
                <Form.Group controlId="colorSelect">
                  <Form.Label>Select Color:</Form.Label>
                  <Form.Control
                    as="select"
                    onChange={(e) =>
                      setSelectedColor(
                        fullPieceData.colors.find(
                          (color) => color.name === e.target.value
                        )
                      )
                    }
                  >
                    <option value="">Select color...</option>
                    {fullPieceData.colors.map((color, index) => (
                      <option key={index} value={color.name}>
                        {color.name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="quantity">
                  <Form.Label>Quantity:</Form.Label>
                  <Form.Control
                    type="number"
                    min="1"
                    max={maxQuantity}
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                  />
                  <Form.Text className="text-muted">
                    Max quantity available: {maxQuantity}
                  </Form.Text>
                </Form.Group>
                {selectedColor && (
                  <p>Total Price: {selectedColor.price * quantity}</p>
                )}
              </Form>
            </Col>
          </Row>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleAddToCart}>
          <img src="./cart-plus.svg" alt="Add to Cart" />
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PieceOptions;
