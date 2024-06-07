import React, { useState, useEffect } from "react";
import { Card, Button, Row, Col, Spinner, Modal } from "react-bootstrap";
import ColorCarousel from "./ColorCarousel";
import PieceOptions from "./PieceOptions";
import { CartPlus } from "react-bootstrap-icons";
import ThreePointsButton from "./ThreePointsButton";
import { deletePiece } from "./pieceUtils";
import PieceForm from "../components/admin/piece/PieceForm";

const Inventory = ({ limit, filteredColors = [] }) => {
  const [inventoryData, setInventoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPieceData, setSelectedPieceData] = useState(null);
  const [showPieceFormModal, setShowPieceFormModal] = useState(false);
  const [showPieceOptionsModal, setShowPieceOptionsModal] = useState(false);
  const userData = JSON.parse(localStorage.getItem("userData"));

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
    setSelectedPieceData(pieceData);
    setShowPieceOptionsModal(true);
  };

  const handleEditPiece = (pieceData) => {
    console.log("editing piece:", pieceData);
  };

  const handleDeletePiece = (pieceData) => {
    console.log("deleting piece:", pieceData);
    deletePiece(pieceData);
  };

  const handleAddPieceDetail = (pieceData) => {
    setSelectedPieceData(pieceData);
    setShowPieceFormModal(true);
  };

  const handleClosePieceOptions = () => {
    setShowPieceOptionsModal(false);
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
    pieces = pieces.filter((piece) =>
      piece.colors.some((color) => filteredColors.includes(color.name))
    );
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
                        <Row>
                          <Col>
                            <Button
                              variant="primary"
                              onClick={() => handleAddToCart(piece)}
                            >
                              <CartPlus /> Add
                            </Button>
                          </Col>
                          {userData && userData.roles.includes("ROLE_ADMIN") && (
                            <Col>
                              <ThreePointsButton
                                target={piece}
                                onEdit={handleEditPiece}
                                onDelete={handleDeletePiece}
                                onAddPieceDetail={handleAddPieceDetail}
                              />
                            </Col>
                          )}
                        </Row>
                      </Col>
                    </Row>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal
        show={showPieceFormModal}
        onHide={() => setShowPieceFormModal(false)}
        size="xl"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Piece Detail</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <PieceForm piece={selectedPieceData} pieceDetail />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowPieceFormModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {selectedPieceData && (
        <PieceOptions
          pieceData={selectedPieceData}
          onClose={handleClosePieceOptions}
        />
      )}
    </div>
  );
};

export default Inventory;
