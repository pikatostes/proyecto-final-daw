import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import ColorCarousel from "./ColorCarousel";
import PieceOptions from "./PieceOptions";
import { Cart, CartPlus } from "react-bootstrap-icons";

const Inventory = ({ inventoryData, limit, filteredColors = [] }) => {
  const [selectedPieceData, setSelectedPieceData] = React.useState(null);

  const handleAddToCart = (pieceData) => {
    setSelectedPieceData(pieceData);
    window.location.reload();
  };

  if (!inventoryData) {
    return <p>No se encontraron piezas de inventario de Lego.</p>;
  }

  let pieces = inventoryData.slice(0, limit);
  if (filteredColors.length > 0) {
    pieces = pieces.filter((piece) => filteredColors.includes(piece.color_id));
  }

  if (pieces.length === 0) {
    return (
      <p>
        No se encontraron piezas que coincidan con los filtros seleccionados.
      </p>
    );
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
                          onClick={() => setSelectedPieceData(piece)}
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
