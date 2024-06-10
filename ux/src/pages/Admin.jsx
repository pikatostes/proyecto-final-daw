import React, { useEffect, useState } from "react";
import { Col, Container, Nav, Row, Tab, Button, Modal } from "react-bootstrap";
import UserList from "../components/admin/user/UserList";
import PostReportsList from "../components/admin/reports/PostReportsList";
import CommentReportsList from "../components/admin/reports/CommentReportList";
import Inventory from "../components/Inventory";
import { PersonGear } from "react-bootstrap-icons";
import Register from "../pages/Register";
import PostPage from "../components/admin/post/PostPage";
import PieceForm from "../components/admin/piece/PieceForm";
import ColorForm from "../components/admin/color/ColorForm"; // Importar el formulario de color
import { createColor } from "../components/admin/color/colorUtils";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("users");
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showPieceFormModal, setShowPieceFormModal] = useState(false);
  const [showColorFormModal, setShowColorFormModal] = useState(false); // Estado para el modal del formulario de color
  const [selectedPieceData, setSelectedPieceData] = useState(null);
  const [pieces, setPieces] = useState([]);

  useEffect(() => {
    const fetchPieces = async () => {
      try {
        const response = await fetch("http://localhost:8000/piece");
        if (!response.ok) {
          throw new Error("Failed to fetch pieces");
        }
        const data = await response.json();
        console.log("Fetched pieces:", data);
        setPieces(data);
      } catch (error) {
        console.error("Error fetching pieces:", error);
      }
    };

    fetchPieces();
  }, []);

  const userData = JSON.parse(localStorage.getItem("userData"));

  if (!userData || !userData.roles.includes("ROLE_ADMIN")) {
    window.location.href = "/error403";
    return null; // To avoid rendering the component before redirecting
  }

  const handleShowRegisterModal = () => setShowRegisterModal(true);
  const handleCloseRegisterModal = () => setShowRegisterModal(false);

  const handleShowPieceFormModal = () => {
    setSelectedPieceData(null);
    setShowPieceFormModal(true);
  };
  const handleClosePieceFormModal = () => setShowPieceFormModal(false);

  const handleShowColorFormModal = () => setShowColorFormModal(true); // Mostrar el modal del formulario de color
  const handleCloseColorFormModal = () => setShowColorFormModal(false); // Ocultar el modal del formulario de color

  const handleCreateColor = (color) => {
    // Aquí puedes manejar el envío del color al backend o cualquier otra lógica que necesites
    console.log("Color creado:", color);
    createColor(color);
    setShowColorFormModal(false);
  };

  return (
    <Container style={{ minHeight: "100vh" }} data-bs-theme="dark">
      <h2>
        Control Panel <PersonGear />
      </h2>
      <Row>
        <Col xs={12} md={2}>
          <Nav
            variant="pills"
            activeKey={activeTab}
            onSelect={(tab) => setActiveTab(tab)}
            className="justify-content-center flex-md-column flex-xs-row"
            data-bs-theme="dark"
            justify
          >
            <Nav.Item eventKey="users">
              <Nav.Link eventKey="users">Users</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="posts">Posts</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="comments">Comments</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="pieces">Pieces</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col xs={12} md={10}>
          <Tab.Content>
            <Tab.Pane eventKey="users" active={activeTab === "users"}>
              <Button
                variant="primary"
                onClick={handleShowRegisterModal}
                className="mt-3"
              >
                Register New User
              </Button>
              <UserList
                apiUrl={"http://localhost:8000/admin/user/list"}
                data-bs-theme="dark"
              />
            </Tab.Pane>
            <Tab.Pane eventKey="posts" active={activeTab === "posts"}>
              <PostPage />
            </Tab.Pane>
            <Tab.Pane eventKey="comments" active={activeTab === "comments"}>
              <CommentReportsList />
            </Tab.Pane>
            <Tab.Pane eventKey="pieces" active={activeTab === "pieces"}>
              <Button
                variant="primary"
                onClick={handleShowPieceFormModal}
                className="mt-3"
              >
                New Piece
              </Button>
              <Button
                variant="secondary"
                onClick={handleShowColorFormModal}
                className="mt-3"
              >
                New Color
              </Button>
              <Inventory pieces={pieces}/>
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>

      <Modal
        show={showRegisterModal}
        onHide={handleCloseRegisterModal}
        size="xl"
      >
        <Modal.Header closeButton>
          <Modal.Title>Register New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Register />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseRegisterModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showPieceFormModal}
        onHide={handleClosePieceFormModal}
        size="xl"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Piece Detail</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <PieceForm />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClosePieceFormModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showColorFormModal}
        onHide={handleCloseColorFormModal}
        size="md"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>New Color</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ColorForm onSubmit={handleCreateColor} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseColorFormModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Admin;
