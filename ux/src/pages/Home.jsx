import React, { useState, useEffect } from "react";
import {
  Card,
  Col,
  Container,
  Image,
  Row,
  Spinner,
} from "react-bootstrap";
import CarouselComponent from "../components/Carousel";
import Minifigures from "../assets/minifigures.webp";
import LegoIcon from "../assets/lego-icon.webp";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:8000/post/most-liked"); // Cambia esta URL por la correcta
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <Container
      fluid
      className="d-flex flex-column align-items-center text-center"
      style={{ minHeight: "100vh" }}
      data-bs-theme="dark"
    >
      <h2>Welcome to BrickPoint!</h2>
      <h3>
        Your <Image src={LegoIcon} alt="Lego Icon" rounded height={35} /> pieces
        shop and forum
      </h3>
      {/* <CarouselComponent carouselSize="carousel-md" imageSizes={imageSizes} /> */}
      <Row className="align-items-center">
        <Col xs={12}>
          <Image src={Minifigures} alt="Minifigures" fluid />
        </Col>
        <Col xs={12}>
          <h3>Best Creations</h3>
          {loading ? (
            <Spinner animation="border" variant="light" />
          ) : error ? (
            <p>Error: {error}</p>
          ) : (
            <Row>
              {posts.map((post) => (
                <Col xs={12} md={4} key={post.id}>
                  <Card className="mb-3" data-bs-theme="dark">
                    <Card.Body>
                      <Row className="align-items-center">
                        <Col xs={12} md={4}>
                          <Image src={post.image} alt={post.title} fluid />
                        </Col>
                        <Col xs={12} md={8}>
                          <h3>{post.title}</h3>
                          <p>{post.description}</p>
                          <p>
                            <strong>{post.totalLikes} likes</strong>
                          </p>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
