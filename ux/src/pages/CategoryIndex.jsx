import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Spinner, Image } from "react-bootstrap";
import hyperdrive from "../assets/hyperdrive.gif";

const CategoryIndex = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredCategory, setHoveredCategory] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:8000/post/category");
        const data = await response.json();
        setCategories(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  console.log(categories);

  return (
    <Container className="text-center">
      <h2>BrickPoint Creations</h2>
      <h3>Browse among the latest LEGO creations made by our users!</h3>
      <Row>
        {loading ? (
          <Col>
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </Col>
        ) : (
          <>
            {categories.map((category) => (
              <Col key={category.id} xs={12} lg={6} className="mb-4">
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "200px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    border: "none",
                  }}
                  onMouseEnter={() => setHoveredCategory(category.name)}
                  onMouseLeave={() => setHoveredCategory(null)}
                >
                  {hoveredCategory === category.name && category.name === "Star Wars" && (
                    <Image
                      src={hyperdrive}
                      alt="hyperdrive"
                      style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        top: 0,
                        left: 0,
                        opacity: 0.5,
                        objectFit: "cover",
                      }}
                      rounded
                    />
                  )}
                  <Card.Img
                    variant="top"
                    src={category.image}
                    alt={category.name}
                    style={{
                      objectFit: "contain",
                      maxHeight: "100%",
                      maxWidth: "100%",
                      zIndex: 1,
                      transform: hoveredCategory === category.name ? 'scale(0.9)' : 'scale(1)',
                      transition: 'transform 0.3s ease',
                    }}
                  />
                </div>
              </Col>
            ))}
          </>
        )}
      </Row>
    </Container>
  );
};

export default CategoryIndex;
