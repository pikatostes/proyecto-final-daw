import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { editComment } from './commentUtils';

const EditCommentForm = ({ show, handleClose, comment, setError }) => {
  const [newText, setNewText] = useState(comment.text);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await editComment(comment.id, newText);
      handleClose();
      window.location.reload();
    } catch (error) {
      setError("Error al editar el comentario");
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Comment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formCommentText">
            <Form.Label>Comment</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-3">
            Save Changes
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditCommentForm;
