import React, { useState } from "react";
import { Accordion, Card, Col, Image, Row, Button, Form } from "react-bootstrap";

const PieceDetailsAccordion = ({ piece }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editableColors, setEditableColors] = useState(piece.colors);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (index, field, value) => {
    const newColors = [...editableColors];
    newColors[index][field] = value;
    setEditableColors(newColors);
  };

  return (
    <Accordion>
      <Accordion.Item eventKey={piece.id}>
        <Accordion.Header>{piece.name}</Accordion.Header>
        <Accordion.Body>
          {editableColors.map((color, index) => (
            <Card key={index} className="mb-2">
              <Row className="align-items-center">
                <Col xs={3}>
                  <Image src={color.image} alt={color.name} fluid style={{ maxHeight: "100px" }} />
                </Col>
                <Col xs={7}>
                  {isEditing ? (
                    <Form>
                      <Form.Group controlId={`formColorName-${index}`}>
                        <Form.Label>Color Name</Form.Label>
                        <Form.Control
                          type="text"
                          value={color.name}
                          onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                        />
                      </Form.Group>
                      <Form.Group controlId={`formColorPrice-${index}`}>
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                          type="number"
                          value={color.price}
                          onChange={(e) => handleInputChange(index, 'price', e.target.value)}
                        />
                      </Form.Group>
                      <Form.Group controlId={`formColorStock-${index}`}>
                        <Form.Label>Stock</Form.Label>
                        <Form.Control
                          type="number"
                          value={color.stock}
                          onChange={(e) => handleInputChange(index, 'stock', e.target.value)}
                        />
                      </Form.Group>
                    </Form>
                  ) : (
                    `${color.name} - Price: $${color.price} - Stock: ${color.stock}`
                  )}
                </Col>
                <Col xs={2}>
                  <Button variant="primary" onClick={handleEditClick}>
                    {isEditing ? 'Save' : 'Edit'}
                  </Button>
                </Col>
              </Row>
            </Card>
          ))}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default PieceDetailsAccordion;
