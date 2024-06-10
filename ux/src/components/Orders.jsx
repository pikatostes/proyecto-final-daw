import React, { useEffect, useState } from "react";
import { Accordion, Card, Button, Container } from "react-bootstrap";
import { getOrders } from "../pages/orderUtils";

const Orders = ({ userId }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersData = await getOrders(userId);
        setOrders(ordersData);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [userId]);

  return (
    <Container>
      <Accordion>
        {orders.map((order, index) => (
          <Card key={order.id}>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey={String(index)}>
                Order #{order.id} - Total: ${order.total.toFixed(2)} - Status: {order.status} - Created at: {order.created_at}
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey={String(index)}>
              <Card.Body>
                {order.piece_details.map((piece) => (
                  <div key={piece.id}>
                    <p>Name: {piece.name}</p>
                    <p>Quantity: {piece.quantity}</p>
                  </div>
                ))}
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        ))}
      </Accordion>
    </Container>
  );
};

export default Orders;
