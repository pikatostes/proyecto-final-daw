import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Image,
  Spinner,
  Alert,
  Tabs,
  Tab,
  Nav,
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
    <Container>
      <Tabs
        defaultActiveKey="profile"
        id="fill-tab-example"
        className="mb-3"
        justify
        data-bs-theme="dark"
      >
        <Tab eventKey="profile" title="Profile">
          <Tab.Container id="profile-tabs" defaultActiveKey="profile">
            <Row>
              <Col sm={2}>
                <Nav
                  justify
                  variant="pills"
                  className="flex-md-column flex-sm-row mb-3"
                >
                  <Nav.Item>
                    <Nav.Link eventKey="profile">My Info</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="billingInfo">Billing Info</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="orders">Orders</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col sm={10}>
                <Tab.Content>
                  <Tab.Pane eventKey="profile">
                    <UserDetailPublic userData={userData} />
                  </Tab.Pane>
                  <Tab.Pane eventKey="billingInfo"></Tab.Pane>
                  <Tab.Pane eventKey="orders"></Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Tab>
        <Tab eventKey="Posts" title="Posts">
          <Tab.Container id="post-tabs" defaultActiveKey="">
            <Row>
              <Col sm={2}>
                <PostCategory
                  apiUrl={"http://localhost:8000/user/posts/categories"}
                  userId={userData.id}
                  onSelectCategory={handleSelectCategory}
                />
              </Col>
              <Col sm={10}>
                <Tab.Content>
                  <Tab.Pane eventKey={selectedCategory}>
                    <PostsList
                      apiUrl={`http://localhost:8000/user/${userData.id}/posts`}
                      category={selectedCategory}
                    />
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Tab>
        <Tab eventKey="likes" title="Likes">
          <PostsList
            apiUrl={`http://localhost:8000/user/${userData.id}/likes`}
          />
        </Tab>
        <Tab eventKey="comments" title="Comments"></Tab>
      </Tabs>
    </Container>
  );
};

export default PublicProfile;
