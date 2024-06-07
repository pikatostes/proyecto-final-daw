import React, { useState } from "react";
import {
  Modal,
  Button,
  Row,
  Col,
  InputGroup,
  Form,
  Container,
  Image,
} from "react-bootstrap";
import { ChatFill } from "react-bootstrap-icons";
import PostComments from "./PostComments";
import { sendComment } from "./commentUtils"; // Importar la función sendComment

const PostDetail = ({ post, onClose }) => {
  const [comment, setComment] = useState(""); // Inicializamos el estado de comentario como una cadena vacía
  const [comments, setComments] = useState([]); // Estado para los comentarios
console.log(post)
  const handleChange = (e) => {
    setComment(e.target.value); // Actualizamos el estado del comentario con el valor del textarea
  };

  const handleSubmit = async () => {
    try {
      // Construir el objeto de datos a enviar
      const postData = {
        postId: post.id,
        userId: localStorage.getItem("user_id"),
        text: comment,
      };

      await sendComment(postData); // Usar la función sendComment para enviar el comentario
      setComment(""); // Limpiamos el campo de comentario después de enviar
      fetchComments(post.id); // Actualizar los comentarios después de enviar
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchComments = async (postId) => {
    try {
      const response = await fetch(`http://localhost:8000/comment/${postId}`);
      if (!response.ok) {
        throw new Error("Error fetching comments");
      }
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Modal
      show={true}
      onHide={onClose}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <Image src={post.avatar} alt="" width={30} fluid roundedCircle />{" "}
          <strong>{post.user}</strong> {post.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container fluid>
          <Row>
            <Col xs={12} md={6}>
              <Image src={post.image} alt={post.title} fluid />
              <p>{post.description}</p>
            </Col>
            <Col xs={12} md={6}>
              <InputGroup>
                <Form.Control
                  as="textarea"
                  rows={1}
                  value={comment}
                  onChange={handleChange}
                />
                <Button variant="primary" onClick={handleSubmit}>
                  <ChatFill />
                </Button>
              </InputGroup>
              <br />
              <PostComments post={post} comments={comments} setComments={setComments} />
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PostDetail;
