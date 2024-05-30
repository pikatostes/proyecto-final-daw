import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";

const PostIndex = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

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
                <Card
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "200px",
                    border: "none",
                  }}
                >
                  <Card.Img
                    variant="top"
                    src={category.image}
                    alt={category.name}
                    style={{
                      objectFit: "contain",
                      maxHeight: "100%",
                      maxWidth: "100%",
                    }}
                  />
                </Card>
              </Col>
            ))}
          </>
        )}
      </Row>
    </Container>
  );
};

export default PostIndex;
