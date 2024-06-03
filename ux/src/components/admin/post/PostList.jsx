import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  Button,
  Row,
  Col,
  Image,
  Spinner,
} from "react-bootstrap";
import { HeartFill } from "react-bootstrap-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import { handleDeletePost } from "../../postUtils";
import ThreePointsButton from "../../ThreePointsButton";

const PostList = ({ apiUrl }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userData = localStorage.getItem("userData");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Error al obtener los datos de usuarios");
        }
        const data = await response.json();
        setPosts(data);
        setLoading(false);
        setError(null);
      } catch (error) {
        console.error("Error:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchPosts();
  }, [apiUrl]);

  const handleDelete = (postId) => {
    handleDeletePost(postId, posts, setPosts, setError);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-dark">
        <Spinner animation="border" variant="light" />
      </div>
    );
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <Container fluid>
      <h2>Lista de Usuarios</h2>
      <Row className="align-items-center">
        {posts.map((post) => (
          <Col key={post.id} xs={12}>
            <Card>
              <Card.Body>
                <Row>
                  <Col xs={6} md={4} lg={2}>
                    <Card.Img src={post.image} />
                  </Col>
                  <Col xs={6} md={8} lg={10}>
                    <Row className="">
                      <Col xs={9}>
                        <Card.Title>{post.title}</Card.Title>
                        <Card.Text>{post.description}</Card.Text>
                      </Col>
                      <Col xs={3}>
                        <ThreePointsButton target={post} onDelete={handleDelete} userSession={userData.user} />
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default PostList;
