import React, { useState } from "react";
import { Col, Container, Nav, Row, Tab } from "react-bootstrap";
import UserList from "../components/admin/user/UserList";
import PostReportsList from "../components/admin/reports/PostReportsList";
import CommentReportsList from "../components/admin/reports/CommentReportList";
import PostsList from "../components/PostsList";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("post-reports");

  const userData = JSON.parse(localStorage.getItem("userData"));

  if (!userData || !userData.roles.includes("ROLE_ADMIN")) {
    window.location.href = "/error403";
    return null; // Para evitar renderizar el componente antes de redireccionar
  }

  return (
    <Container style={{ minHeight: "100vh" }}>
      <h2>Control Panel</h2>
      <Row>
        <Col xs={12}>
          <Nav
            variant="pills"
            activeKey={activeTab}
            onSelect={(tab) => setActiveTab(tab)}
            className="justify-content-center"
          >
            <Nav.Item>
              <Nav.Link eventKey="post-reports">Post Reports</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="comment-reports">Comment Reports</Nav.Link>
            </Nav.Item>
          </Nav>
          <Tab.Content>
            <Tab.Pane eventKey="post-reports" active={activeTab === "post-reports"}>
              <PostReportsList />
            </Tab.Pane>
            <Tab.Pane eventKey="comment-reports" active={activeTab === "comment-reports"}>
              <CommentReportsList />
            </Tab.Pane>
          </Tab.Content>
          <UserList apiUrl={"http://localhost:8000/admin/user/list"} />
          <PostsList apiUrl={"http://localhost:8000/admin/post/list"} />
        </Col>
      </Row>
    </Container>
  );
};

export default Admin;

