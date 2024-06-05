import React, { useState } from "react";
import { Col, Container, Nav, Row, Tab, Button, Modal } from "react-bootstrap";
import UserList from "../components/admin/user/UserList";
import PostReportsList from "../components/admin/reports/PostReportsList";
import CommentReportsList from "../components/admin/reports/CommentReportList";
import Inventory from "../components/Inventory";
import { PersonGear } from "react-bootstrap-icons";
import Register from "../pages/Register";
import PostPage from "../components/admin/post/PostPage";
import PieceForm from "../components/admin/piece/PieceForm";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("users");
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showNewPieceModal, setShowNewPieceModal] = useState(false);

  const userData = JSON.parse(localStorage.getItem("userData"));

  if (!userData || !userData.roles.includes("ROLE_ADMIN")) {
    window.location.href = "/error403";
    return null; // To avoid rendering the component before redirecting
  }

  const handleShowRegisterModal = () => setShowRegisterModal(true);
  const handleCloseRegisterModal = () => setShowRegisterModal(false);

  const handleShowNewPieceModal = () => setShowNewPieceModal(true);
  const handleCloseNewPieceModal = () => setShowNewPieceModal(false);

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
                onClick={handleShowNewPieceModal}
                className="mt-3"
              >
                New Piece
              </Button>
              <Inventory />
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
        show={showNewPieceModal}
        onHide={handleCloseNewPieceModal}
        size="xl"
      >
        <Modal.Header closeButton>
          <Modal.Title>Register New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <PieceForm />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseRegisterModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Admin;
