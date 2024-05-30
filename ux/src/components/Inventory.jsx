import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import ColorCarousel from "./ColorCarousel";
import PieceOptions from "./PieceOptions";

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
            <Card style={{ minHeight: "" }}>
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
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-cart"
                            viewBox="0 0 16 16"
                          >
                            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                          </svg>
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
