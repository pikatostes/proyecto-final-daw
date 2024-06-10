import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { fetchUserBillingInfo } from "../components/profileUtil";
import { Trash } from "react-bootstrap-icons";
import { createOrder } from "./orderUtils";

const Payment = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cardInfo, setCardInfo] = useState({
    cardNumber: "",
    expirationDate: "",
    cvv: "",
  });
  const [billingInfoOptions, setBillingInfoOptions] = useState([]);
  const [selectedBillingInfo, setSelectedBillingInfo] = useState("");

  useEffect(() => {
    const sessionCartItems = JSON.parse(localStorage.getItem("cart"));
    if (sessionCartItems) {
      setCartItems(sessionCartItems);
      calculateTotalPrice(sessionCartItems);
    }

    const userSession = localStorage.getItem("user_id");
    if (userSession) {
      fetchUserBillingInfo(userSession)
        .then((data) => {
          setBillingInfoOptions(
            data.map((info) => ({
              id: info.id,
              address: info.address,
            }))
          );
        })
        .catch((error) => {
          console.error("Error fetching billing info:", error);
        });
    }
  }, []);

  const calculateTotalPrice = (items) => {
    const total = items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotalPrice(total);
  };

  const handleRemoveItem = (index) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems.splice(index, 1);
    setCartItems(updatedCartItems);
    localStorage.setItem("cart", JSON.stringify(updatedCartItems));
    calculateTotalPrice(updatedCartItems);
  };

  const handleIncreaseQuantity = (index) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems[index].quantity += 1;
    setCartItems(updatedCartItems);
    localStorage.setItem("cart", JSON.stringify(updatedCartItems));
    calculateTotalPrice(updatedCartItems);
  };

  const handleDecreaseQuantity = (index) => {
    const updatedCartItems = [...cartItems];
    if (updatedCartItems[index].quantity > 1) {
      updatedCartItems[index].quantity -= 1;
      setCartItems(updatedCartItems);
      localStorage.setItem("cart", JSON.stringify(updatedCartItems));
      calculateTotalPrice(updatedCartItems);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardInfo({
      ...cardInfo,
      [name]: value,
    });
  };

  const handlePayment = async () => {
    try {
      const userId = localStorage.getItem("user_id");
      const formData = {
        user_id: userId,
        total: totalPrice,
        billing_address: selectedBillingInfo.id,
        piece_details: cartItems.map(item => ({
          id: item.id,
          quantity: item.quantity
        }))
      };

      const orderData = await createOrder(formData);
      console.log("Order created:", orderData);
      // Aquí puedes agregar lógica adicional para manejar el éxito del pago
    } catch (error) {
      console.error("Error processing payment:", error);
      // Aquí puedes agregar lógica adicional para manejar el error del pago
    }
  };

  const handleSelectChange = (e) => {
    setSelectedBillingInfo(e.target.value);
  };

  return (
    <Container>
      <Row className="align-items-center justify-content-center">
        <Col xs={12} md={6}>
          {cartItems && cartItems.length === 0 ? (
            <p>No items in cart</p>
          ) : (
            <>
              {cartItems.map((item, index) => (
                <Card key={index} className="mb-3">
                  <Card.Body>
                    <Row className="align-items-center justify-content-center">
                      <Col xs={3}>
                        <Card.Img variant="top" src={item.image} />
                      </Col>
                      <Col xs={6}>
                        <Row className="align-items-center justify-content-center">
                          <Col xs={12}>
                            <Card.Text>{item.name}</Card.Text>
                          </Col>
                          <Col xs={4}>
                            <Button
                              variant="outline-secondary"
                              size="sm"
                              onClick={() => handleDecreaseQuantity(index)}
                            >
                              -
                            </Button>
                          </Col>
                          <Col xs={4}>
                            <Card.Text>{item.quantity}</Card.Text>
                          </Col>
                          <Col xs={4}>
                            <Button
                              variant="outline-secondary"
                              size="sm"
                              onClick={() => handleIncreaseQuantity(index)}
                            >
                              +
                            </Button>
                          </Col>
                          <Col xs={12}>
                            <Card.Text>
                              Total: ${(item.price * item.quantity).toFixed(2)}
                            </Card.Text>
                          </Col>
                        </Row>
                      </Col>
                      <Col xs={3}>
                        <Button
                          variant="danger"
                          onClick={() => handleRemoveItem(index)}
                        >
                          <Trash alt="Remove" />
                        </Button>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              ))}
              <div className="d-flex justify-content-between align-items-center">
                <h4>Total Price: ${totalPrice.toFixed(2)}</h4>
                <Button variant="success" onClick={handlePayment}>
                  Pay
                </Button>
              </div>
            </>
          )}
        </Col>
        <Col xs={6}>
          <Card>
            <Card.Header>Fill the form</Card.Header>
            <Card.Body>
              <Form className="mt-4">
                <Form.Group controlId="billingInfo">
                  <Form.Label>Select Billing Info</Form.Label>
                  <Form.Select
                    onChange={handleSelectChange}
                    value={selectedBillingInfo}
                  >
                    <option value="">Choose...</option>
                    {billingInfoOptions.map((info) => (
                      <option key={info.id} value={info.id}>
                        {info.address}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group controlId="cardNumber">
                  <Form.Label>Card Number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter card number"
                    name="cardNumber"
                    value={cardInfo.cardNumber}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="expirationDate">
                  <Form.Label>Expiration Date</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="MM/YY"
                    name="expirationDate"
                    value={cardInfo.expirationDate}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="cvv">
                  <Form.Label>CVV</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter CVV"
                    name="cvv"
                    value={cardInfo.cvv}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Payment;
