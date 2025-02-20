import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col, Image } from "react-bootstrap";
import ColorCarousel from "./ColorCarousel";
import { CartPlus } from "react-bootstrap-icons";

const PieceOptions = ({ pieceData, onClose }) => {
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [maxQuantity, setMaxQuantity] = useState(1);
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    if (selectedColor) {
      const colorDetails = pieceData.colors.find(
        (color) => color.name === selectedColor.name
      );
      setMaxQuantity(colorDetails.stock);
      if (quantity > colorDetails.stock) {
        setQuantity(colorDetails.stock);
      }
    }
  }, [pieceData, selectedColor, quantity]);

  const handleAddToCart = () => {
    if (selectedColor) {
      const totalPrice = selectedColor.price * quantity;
      const newItem = {
        id: pieceData.id,
        name: pieceData.name,
        color: selectedColor.name,
        quantity: quantity,
        price: totalPrice,
        image: selectedColor.image
      };
      const updatedCart = [...cart, newItem];
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }

    onClose();
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
        <Modal.Title>{pieceData.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col lg={6}>
            {selectedColor && (
                <Image
                  src={selectedColor.image}
                  alt={selectedColor.name}
                  style={{ width: "100%", height: "auto" }}
                  fluid
                />
            )}
          </Col>
          <Col lg={6}>
            <Form>
              <Form.Group controlId="colorSelect">
                <Form.Label>Select Color:</Form.Label>
                <Form.Control
                  as="select"
                  onChange={(e) =>
                    setSelectedColor(
                      pieceData.colors.find(
                        (color) => color.name === e.target.value
                      )
                    )
                  }
                >
                  <option value="">Select color...</option>
                  {pieceData.colors.map((color, index) => (
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
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleAddToCart}>
          <CartPlus alt="Add to Cart" />
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PieceOptions;
