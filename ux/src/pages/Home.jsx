import React from "react";
import CarouselComponent from "../components/Carousel";
import { Col, Container, Image, Row } from "react-bootstrap";
import Minifigures from "../assets/minifigures.webp";

const Home = () => {
  const imageSizes = ["800x400", "800x600", "800x500"]; // Ejemplo de tamaños de imágenes

  return (
    <Container
      fluid
      className="d-flex flex-column align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <h1>Welcome to BrickPoint!</h1>
      {/* <CarouselComponent carouselSize="carousel-md" imageSizes={imageSizes} /> */}
      <Row className="align-items-center">
        <Col>
          <Image src={Minifigures} alt="Minifigures" fluid />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
