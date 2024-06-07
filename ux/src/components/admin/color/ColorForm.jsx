import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const ColorForm = ({ onSubmit }) => {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formColorName">
        <Form.Label>Color Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter color name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit" className="mt-3">
        Create Color
      </Button>
    </Form>
  );
};

export default ColorForm;
