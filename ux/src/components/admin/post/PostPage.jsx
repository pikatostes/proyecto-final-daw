import React, { useState } from "react";
import { Container, Nav, Tab, Row, Col } from "react-bootstrap";
import PostsList from "../../PostsList";
import PostReportsList from "../reports/PostReportsList";
import PostCategories from "../../PostCategories";

const PostPage = () => {
  const [activeTab, setActiveTab] = useState("post-list");

  return (
    <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
      <Container>
        <Nav variant="pills" className="justify-content-center mt-3" data-bs-theme="dark">
          <Nav.Item>
            <Nav.Link eventKey="post-list">Posts</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="post-reports">Reports</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="post-categories">Categories</Nav.Link>
          </Nav.Item>
        </Nav>
        <Row className="mt-3">
          <Col>
            <Tab.Content>
              <Tab.Pane eventKey="post-list">
                <PostsList apiUrl={import.meta.env.VITE_API_URL + "/admin/post/list"} />
              </Tab.Pane>
              <Tab.Pane eventKey="post-reports">
                <PostReportsList />
              </Tab.Pane>
              <Tab.Pane eventKey="post-categories">
                <PostCategories />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Container>
    </Tab.Container>
  );
};

export default PostPage;

