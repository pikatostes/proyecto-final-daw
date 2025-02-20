import React, { useState, useEffect } from "react";
import {
  Button,
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
import { BagFill, People, PeopleFill } from "react-bootstrap-icons";

const Home = () => {
  console.log(localStorage.getItem("token"));
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_API_URL + "/post/most-liked"); // Cambia esta URL por la correcta
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
      {/* <CarouselComponent carouselSize="carousel-md" imageSizes={imageSizes} /> */}
      <Row className="align-items-center">
        <Col xs={12}>
          <h2>Welcome to BrickPoint!</h2>
          <h3>
            Your <Image src={LegoIcon} alt="Lego Icon" rounded height={35} />{" "}
            pieces shop and forum
          </h3>
        </Col>
        <Col xs={12} md={6}>
          <Image src={Minifigures} alt="Minifigures" fluid />
        </Col>
        <Col xs={12} md={6}>
          <Row className="align-items-center justify-content-center w-100 mt-4 mb-4">
            <Col xs={12}>
              <h3>Start exploring our website!</h3>
            </Col>
            <Col xs={6}>
              <Button variant="primary" size="lg" href="/pieces">
                <BagFill /> Shop
              </Button>
            </Col>
            <Col xs={6}>
              <Button variant="primary" size="lg" href="/post">
                <PeopleFill /> Forum
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="align-items-center">
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
