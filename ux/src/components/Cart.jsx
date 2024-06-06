import React, { useEffect, useState } from "react";
import { Offcanvas, Card, Button, Col, Row } from "react-bootstrap";
import { Trash } from "react-bootstrap-icons";

const Cart = ({ show, setShowCart }) => {
  const [cartItems, setCartItems] = useState([]); // Estado local para almacenar los elementos del carrito

  const loadCartItems = () => {
    const sessionCartItems = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(sessionCartItems);
  };

  useEffect(() => {
    loadCartItems();

    // Escucha el evento personalizado para actualizar el carrito
    const handleCartUpdate = () => {
      loadCartItems();
    };

    window.addEventListener("cartUpdated", handleCartUpdate);

    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate);
    };
  }, []);

  const handleClose = () => setShowCart(false);

  const handleRemoveItem = (index) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems.splice(index, 1); // Eliminar el elemento del array
    setCartItems(updatedCartItems);
    localStorage.setItem("cart", JSON.stringify(updatedCartItems)); // Actualizar el carrito en la sesión
  };

  const handleCheckout = () => {
    window.location.href = "/payment";
    console.log("Checkout clicked");
  };

  return (
    <Offcanvas show={show} onHide={handleClose} placement="end" data-bs-theme="dark">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Shopping Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {cartItems && cartItems.length === 0 ? (
          <p>No items in cart</p>
        ) : (
          <>
            {cartItems.map((item, index) => (
              <Card key={index} className="mb-3">
                <Card.Body>
                  <Row>
                    <Col xs={3}>
                      <Card.Img variant="top" src={item.image} />
                    </Col>
                    <Col xs={6}>
                      <Row>
                        <Col xs={12}>
                          <Card.Text>{item.name}</Card.Text>
                        </Col>
                        <Col xs={6}>
                          <Card.Text>{item.quantity}</Card.Text>
                        </Col>
                        <Col xs={6}>
                          <Card.Text>{item.price}</Card.Text>
                        </Col>
                      </Row>
                    </Col>
                    <Col xs={3}>
                      <Button
                        variant="danger"
                        onClick={() => handleRemoveItem(index)}
                      >
                        <Trash />
                      </Button>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            ))}
            <Button variant="success" onClick={handleCheckout}>Checkout</Button>
          </>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default Cart;
