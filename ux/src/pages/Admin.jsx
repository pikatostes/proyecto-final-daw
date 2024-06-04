import React, { useState } from "react";
import { Col, Container, Image, Nav, Row, Tab } from "react-bootstrap";
import UserList from "../components/admin/user/UserList";
import PostReportsList from "../components/admin/reports/PostReportsList";
import CommentReportsList from "../components/admin/reports/CommentReportList";
import PostsList from "../components/PostsList";
import { PersonGear } from "react-bootstrap-icons";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("post-reports");

  const userData = JSON.parse(localStorage.getItem("userData"));

  if (!userData || !userData.roles.includes("ROLE_ADMIN")) {
    window.location.href = "/error403";
    return null; // Para evitar renderizar el componente antes de redireccionar
  }

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
          </Nav>
        </Col>
        <Col xs={12} md={10}>
          <Tab.Content>
            <Tab.Pane eventKey="users" active={activeTab === "users"}>
              <UserList
                apiUrl={"http://localhost:8000/admin/user/list"}
                data-bs-theme="dark"
              />
            </Tab.Pane>
            <Tab.Pane eventKey="posts" active={activeTab === "posts"}>
              <PostReportsList />
              <PostsList apiUrl={"http://localhost:8000/admin/post/list"} />
            </Tab.Pane>
            <Tab.Pane eventKey="comments" active={activeTab === "comments"}>
              <CommentReportsList />
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Container>
  );
};

export default Admin;
