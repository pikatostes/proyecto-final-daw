import React, { useState } from "react";
import { Col, Container, Nav, Row, Tab, Tabs } from "react-bootstrap";
import UserDetail from "../components/UserDetail";
import PostsList from "../components/PostsList";
import UserComments from "../components/UserComments";
import BillingInfo from "../components/BillingInfo";
import PostCategory from "../components/PostCategory";
import Orders from "../components/Orders";

const ProfileV2 = () => {
  const [selectedCategory, setSelectedCategory] = useState("");

  const user_id = localStorage.getItem("user_id");
  if (!user_id) {
    window.location.href = "/login";
  }

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
  };

  return (
    <Container className="vh-100">
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
              <Nav justify variant="pills" className="flex-md-column flex-sm-row mb-3">
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
                    <UserDetail />
                  </Tab.Pane>
                  <Tab.Pane eventKey="billingInfo">
                    <BillingInfo />
                  </Tab.Pane>
                  <Tab.Pane eventKey="orders">
                    <Orders userId={user_id} />
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Tab>
        <Tab eventKey="Posts" title="Posts">
          <Tab.Container id="post-tabs" defaultActiveKey="">
            <Row>
              <Col sm={2}>
                <PostCategory apiUrl={import.meta.env.VITE_API_URL + "/user/posts/categories"} userId={user_id} onSelectCategory={handleSelectCategory}/>
              </Col>
              <Col sm={10}>
                <Tab.Content>
                  <Tab.Pane eventKey={selectedCategory}>
                    <PostsList
                      apiUrl={import.meta.env.VITE_API_URL + `/user/${user_id}/posts`}
                      category={selectedCategory}
                    />
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Tab>
        <Tab eventKey="likes" title="Likes">
          <PostsList apiUrl={import.meta.env.VITE_API_URL + `/user/${user_id}/likes`} />
        </Tab>
        <Tab eventKey="comments" title="Comments">
          <UserComments />
        </Tab>
      </Tabs>
    </Container>
  );
};

export default ProfileV2;
