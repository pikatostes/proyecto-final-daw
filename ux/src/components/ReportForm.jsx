import React, { useEffect, useState } from "react";
import { Modal, Form, Button, Image, Row, Col } from "react-bootstrap";
import { handleReportPost } from "./postUtils";
import { reportComment } from "./commentUtils";

const ReportForm = ({ show, handleClose, target, setError }) => {
  const [description, setDescription] = useState("");
  const userId = localStorage.getItem("user_id");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (target.title) {
        // Es un post
        await handleReportPost(target.id, userId, description, setError);
      } else {
        // Es un comentario
        await reportComment(target.id, userId, description, setError);
      }
      handleClose();
    } catch (error) {
      console.error("Error:", error);
      setError("Error al enviar el reporte");
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Report {target.title || target.text}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formUserId">
            <Form.Control type="text" value={userId} plaintext hidden />
          </Form.Group>
          <Form.Group controlId="formTargetId">
            <Row className="d-flex align-items-center">
              <Col xs={3}>
                <Image src={target.image || target.avatar} thumbnail fluid height={50} />
              </Col>
              <Col xs={9}>
                <strong>{target.user}</strong>
                <Form.Control
                  type="text"
                  value={target.title || target.text}
                  plaintext
                  readOnly
                />
              </Col>
            </Row>
          </Form.Group>
          <Form.Group controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-3">
            Submit Report
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ReportForm;
