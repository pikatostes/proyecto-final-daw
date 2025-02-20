import React, { useState } from "react";
import {
  Accordion,
  Card,
  Col,
  Image,
  Row,
  Button,
  Form,
} from "react-bootstrap";

const PieceDetailsAccordion = ({ piece }) => {
  const [editingIndex, setEditingIndex] = useState(null);
  const [editableColors, setEditableColors] = useState(piece.colors);
  const [originalColors, setOriginalColors] = useState(piece.colors);

  const handleEditClick = (index) => {
    setOriginalColors(editableColors); // Save the original colors before editing
    setEditingIndex(index);
  };

  const handleDeleteClick = async (pieceId) => {
    const formdata = new FormData();
    formdata.append("id", pieceId);

    try {
      const response = await fetch(
        import.meta.env.VITE_API_URL + "/piece/detail/delete",
        {
          method: "POST",
          body: formdata,
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSaveClick = async (index) => {
    const color = editableColors[index];

    const formData = new FormData();
    formData.append("id", piece.id);
    formData.append("piece_id", piece.id);
    formData.append("color_id", color.id);
    formData.append("price", color.price);
    formData.append("stock", color.stock);

    console.log(piece);
    // mostrar formdata con for
    for (let pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }

    try {
      const response = await fetch(
        import.meta.env.VITE_API_URL + "/piece/detail/update",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log(result);

      // Assuming the server returns the updated piece detail
      setEditableColors((prevColors) =>
        prevColors.map((c, i) => (i === index ? result : c))
      );
      setEditingIndex(null);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCancelClick = () => {
    setEditableColors(originalColors); // Reset to the original colors
    setEditingIndex(null);
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
                  <Image
                    src={color.image}
                    alt={color.name}
                    fluid
                    style={{ maxHeight: "100px" }}
                  />
                </Col>
                <Col xs={7}>
                  {editingIndex === index ? (
                    <Form>
                      <Form.Group controlId={`formColorName-${index}`}>
                        <Form.Label>Color Name</Form.Label>
                        <Form.Control
                          type="text"
                          value={color.name}
                          onChange={(e) =>
                            handleInputChange(index, "name", e.target.value)
                          }
                        />
                      </Form.Group>
                      <Form.Group controlId={`formColorPrice-${index}`}>
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                          type="number"
                          value={color.price}
                          onChange={(e) =>
                            handleInputChange(index, "price", e.target.value)
                          }
                        />
                      </Form.Group>
                      <Form.Group controlId={`formColorStock-${index}`}>
                        <Form.Label>Stock</Form.Label>
                        <Form.Control
                          type="number"
                          value={color.stock}
                          onChange={(e) =>
                            handleInputChange(index, "stock", e.target.value)
                          }
                        />
                      </Form.Group>
                      <Button
                        variant="primary"
                        onClick={() => handleSaveClick(index)}
                        className="me-2"
                      >
                        Save
                      </Button>
                      <Button variant="secondary" onClick={handleCancelClick}>
                        Cancel
                      </Button>
                    </Form>
                  ) : (
                    `${color.name} - Price: $${color.price} - Stock: ${color.stock}`
                  )}
                </Col>
                <Col xs={2}>
                  <Button
                    variant="primary"
                    onClick={() => handleEditClick(index)}
                  >
                    {editingIndex === index ? "Cancel" : "Edit"}
                  </Button>
                  <Button
                    variant="danger"
                    className="ms-2"
                    onClick={() => handleDeleteClick(piece.id)}
                  >
                    Delete
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
