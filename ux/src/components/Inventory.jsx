import React, { useState } from "react";
import { Card, Button, Row, Col, Modal, Container } from "react-bootstrap";
import ColorCarousel from "./ColorCarousel";
import PieceOptions from "./PieceOptions";
import { CartPlus } from "react-bootstrap-icons";
import ThreePointsButton from "./ThreePointsButton";
import { deletePiece } from "./pieceUtils";
import PieceForm from "../components/admin/piece/PieceForm";
import PieceDetailsAccordion from "./PieceDetailsAccordion";

const Inventory = ({ pieces }) => {
  const [selectedPieceData, setSelectedPieceData] = useState(null);
  const [showPieceFormModal, setShowPieceFormModal] = useState(false);
  const [showPieceOptionsModal, setShowPieceOptionsModal] = useState(false);
  const [showPieceEditModal, setShowPieceEditModal] = useState(false);
  const userData = JSON.parse(localStorage.getItem("userData"));

  const handleAddToCart = (pieceData) => {
    setSelectedPieceData(pieceData);
    setShowPieceOptionsModal(true);
  };

  const handleEditPiece = (pieceData) => {
    setSelectedPieceData(pieceData);
    setShowPieceEditModal(true);
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

  if (!pieces || pieces.length === 0) {
    return <p>No se encontraron piezas de inventario de Lego.</p>;
  }

  return (
    <Container style={{ position: "relative" }} fluid className="vh-100">
      <Row>
        {pieces.map((piece) => (
          <Col key={piece.id} xs={6} sm={6} md={3} lg={2} className="mb-4">
            <Card>
              <Row>
                <Col xs={12} md={12}>
                  <ColorCarousel colors={piece.colors} />
                </Col>
                <Col xs={12} md={12}>
                  <Card.Body>
                    <Row>
                      <Col xs={12}>
                        {userData && userData.roles.includes("ROLE_ADMIN") ? (
                          <Row>
                            <Col xs={9}>
                              <Card.Title>{piece.name}</Card.Title>
                            </Col>
                            <Col xs={3}>
                              <ThreePointsButton
                                target={piece}
                                onEdit={handleEditPiece}
                                onDelete={handleDeletePiece}
                                onAddPieceDetail={handleAddPieceDetail}
                              />
                            </Col>
                          </Row>
                        ) : (
                          <Col xs={12}>
                            <Card.Title>{piece.name}</Card.Title>
                          </Col>
                        )}
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
          <Button
            variant="secondary"
            onClick={() => setShowPieceFormModal(false)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showPieceEditModal}
        onHide={() => setShowPieceEditModal(false)}
        size="xl"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Piece</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <PieceDetailsAccordion piece={selectedPieceData} onSave={() => setShowPieceEditModal(false)} />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowPieceEditModal(false)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {showPieceOptionsModal && selectedPieceData && (
        <PieceOptions
          pieceData={selectedPieceData}
          onClose={handleClosePieceOptions}
        />
      )}
    </Container>
  );
};

export default Inventory;
