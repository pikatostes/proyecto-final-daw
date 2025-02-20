import React from "react";
import CarouselComponent from "../components/Carousel";
import { Card, Col, Container, Image, Nav, Row } from "react-bootstrap";
import Minifigures from "../assets/minifigures.webp";
import LegoIcon from "../assets/lego-icon.webp";

const Home = () => {
  console.log(localStorage.getItem("token"));
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
          <Card>
            <Card.Header>
              <Nav variant="pills" className="justify-content-center" justify>
                <Nav.Item>
                  <Nav.Link eventKey="first">Card Title</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="second">Card Title</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="third">Card Title</Nav.Link>
                </Nav.Item>
              </Nav>
            </Card.Header>
            <Card.Body>
              <Row className="align-items-center">
                <Col xs={12}>
                  <Image
                    src="https://via.placeholder.com/300x300"
                    alt="Placeholder Image"
                    fluid
                  />
                </Col>
                <Col xs={12}>
                  <h3>Card Title</h3>
                  <p>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
