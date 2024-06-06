import React, { useState, useEffect } from "react";
import { Card, Button, Row, Col, Spinner } from "react-bootstrap";
import ColorCarousel from "./ColorCarousel";
import PieceOptions from "./PieceOptions";
import { CartPlus } from "react-bootstrap-icons";

const Inventory = ({ limit, filteredColors = [] }) => {
  const [inventoryData, setInventoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPieceData, setSelectedPieceData] = useState(null);

  useEffect(() => {
    const fetchInventoryData = async () => {
      try {
        const response = await fetch("http://localhost:8000/piece");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setInventoryData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInventoryData();
  }, []);

  const handleAddToCart = (pieceData) => {
    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    cartItems.push(pieceData);
    localStorage.setItem("cart", JSON.stringify(cartItems));
    setSelectedPieceData(pieceData);

    // Dispara un evento personalizado para notificar la actualización del carrito
    const event = new CustomEvent("cartUpdated");
    window.dispatchEvent(event);
  };

  if (loading) {
    return (
      <div className="text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!inventoryData || inventoryData.length === 0) {
    return <p>No se encontraron piezas de inventario de Lego.</p>;
  }

  let pieces = inventoryData.slice(0, limit || inventoryData.length);
  if (filteredColors.length > 0) {
    pieces = pieces.filter((piece) => filteredColors.includes(piece.color_id));
  }

  if (pieces.length === 0) {
    return <p>No se encontraron piezas que coincidan con los filtros seleccionados.</p>;
  }

  return (
    <div style={{ position: "relative" }}>
      <Row>
        {pieces.map((piece) => (
          <Col key={piece.id} xs={6} sm={6} md={3} lg={2} className="mb-4">
            <Card style={{ minHeight: "" }} data-bs-theme="dark">
              <Row>
                <Col xs={12} md={12}>
                  <ColorCarousel colors={piece.colors} />
                </Col>
                <Col xs={12} md={12}>
                  <Card.Body>
                    <Row>
                      <Col xs={12} xl={6}>
                        <Card.Title>{piece.name}</Card.Title>
                      </Col>
                      <Col xs={12} xl={6}>
                        <Button
                          variant="primary"
                          onClick={() => handleAddToCart(piece)}
                        >
                          <CartPlus /> Add
                        </Button>
                      </Col>
                    </Row>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          </Col>
        ))}
      </Row>
      {selectedPieceData && (
        <PieceOptions
          pieceData={selectedPieceData}
          onClose={() => setSelectedPieceData(null)}
        />
      )}
    </div>
  );
};

export default Inventory;
