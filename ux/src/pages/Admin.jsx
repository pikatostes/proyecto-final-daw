import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import UserList from "../components/admin/user/UserList";
import PostList from "../components/admin/post/PostList";
import PostReportsList from "../components/admin/reports/PostReportsList";
import CommentReportsList from "../components/admin/reports/CommentReportList";


const Admin = () => {
  if (
    !localStorage.getItem("user_role") ||
    localStorage.getItem("user_role") != ["ROLE_ADMIN", "ROLE_USER"]
  ) {
    window.location.href = "/error403";
  }

  return (
    <Container style={{ minHeight: "100vh" }}>
      <h2>Control Panel</h2>
      <Row>
        <Col xs={12}>
          <PostReportsList />
          <CommentReportsList />
        </Col>
      </Row>
    </Container>
  );
};

export default Admin;
