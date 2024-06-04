import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Spinner,
  Alert,
  Nav,
  Card,
  Tab,
} from "react-bootstrap";
import PostCategory from "../components/PostCategory";
import PostsList from "../components/PostsList";
import UserDetailPublic from "../components/UserDetailPublic";

const PublicProfile = () => {
  const { username } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [activeTab, setActiveTab] = useState("posts");

  const userSession = localStorage.getItem("userData");

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/user-data/${username}`
        );
        if (!response.ok) {
          throw new Error("User not found");
        }
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [username]);

  if (loading) return <Spinner animation="border" role="status" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Container data-bs-theme="dark">
      <Row>
        <Col xs={12} md={3} className="mb-2">
          <UserDetailPublic userData={userData} />
        </Col>
        <Col xs={12} md={9}>
          <Card className="mb-2">
            <Card.Header>
              <Nav
                variant="pills"
                activeKey={activeTab}
                onSelect={(tab) => setActiveTab(tab)}
                className="justify-content-center"
                justify
              >
                <Nav.Item>
                  <Nav.Link eventKey="posts">Posts</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="likes">Likes</Nav.Link>
                </Nav.Item>
              </Nav>
            </Card.Header>
            <Card.Body>
              <Tab.Content>
                <Tab.Pane eventKey="posts" active={activeTab === "posts"}>
                  <Row>
                    <Col xs={12} md={3}>
                      <PostCategory
                        apiUrl={"http://localhost:8000/user/posts/categories"}
                        userId={userData.id}
                        onSelectCategory={handleSelectCategory}
                      />
                    </Col>
                    <Col
                      xs={12}
                      md={9}
                      style={{ maxHeight: "77vh", overflowY: "auto" }}
                    >
                      <PostsList
                        apiUrl={`http://localhost:8000/user/${userData.id}/posts`}
                        category={selectedCategory}
                      />
                    </Col>
                  </Row>
                </Tab.Pane>
                <Tab.Pane eventKey="likes" active={activeTab === "likes"}>
                  <PostsList
                    apiUrl={`http://localhost:8000/user/${userData.id}/likes`}
                  />
                </Tab.Pane>
              </Tab.Content>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PublicProfile;
