import React, { useEffect, useState } from "react";
import { Card, Col, Container, Image, Row, Spinner } from "react-bootstrap";
import { deleteComment, fetchUserComments } from "./commentUtils";
import ThreePointsButton from "./ThreePointsButton";
import EditCommentForm from "./EditCommentForm";
import { fetchUserDataUsingToken } from "../pages/userUtils";
import ReportForm from "./ReportForm";

const UserComments = () => {
  const [userComments, setUserComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingComment, setEditingComment] = useState(null);
  const [reportingComment, setReportingComment] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);

  const userData = fetchUserDataUsingToken();
  const userSession = localStorage.getItem("userSession");

  useEffect(() => {
    if (userData) {
      fetchUserComments(userData.id, setUserComments, setLoading, setError);
    }
  }, []);

  const handleDeleteComment = (commentId) => {
    deleteComment(commentId, () => window.location.reload());
  };

  const handleEditComment = (comment) => {
    setEditingComment(comment);
  };

  const handleReportComment = (comment) => {
    setReportingComment(comment);
  };

  const handleCloseEdit = () => {
    setEditingComment(null);
  };

  const handleCloseReport = () => {
    setReportingComment(null);
  };

  const handleCardClick = (post) => {
    setSelectedPost(post);
  };

  const handleCloseModal = () => {
    setSelectedPost(null);
  };

  return (
    <Card data-bs-theme="dark">
      <Card.Header>User Comments</Card.Header>
      <Card.Body>
        {loading ? (
          <Spinner animation="border" />
        ) : (
          <Container fluid>
            {error && <p>{error}</p>}
            {userComments.map((comment) => (
              <Card key={comment.id} className="mb-3">
                <Card.Body>
                  <Row className="align-items-center">
                    <Row className="align-items-center">
                      <Col xs={4} sm={1}>
                        <Image src={comment.user_avatar} roundedCircle fluid />
                      </Col>
                      <Col xs={6} sm={10}>
                        <strong className="mr-auto">{comment.user}</strong>
                        <div>{comment.text}</div>
                      </Col>
                      <Col xs={2} sm={1} className="d-flex justify-content-end">
                        <ThreePointsButton
                          target={comment}
                          onEdit={handleEditComment}
                          onDelete={handleDeleteComment}
                          onReport={handleReportComment}
                          userSession={userData.user}
                        />
                      </Col>
                    </Row>
                    <Row className="align-items-center">
                      <Col xs={4} sm={1}>
                        <Image
                          src={comment.post_userAvatar}
                          roundedCircle
                          fluid
                        />
                      </Col>
                      <Col xs={4} sm={9}>
                        <strong>{comment.post_user}</strong>
                        <br />
                        {comment.post_title}
                      </Col>
                      <Col xs={4} sm={2}>
                        <Image src={comment.post_image} thumbnail fluid onClick={() => handleCardClick(comment.post)}/>
                      </Col>
                    </Row>
                  </Row>
                </Card.Body>
              </Card>
            ))}
          </Container>
        )}
      </Card.Body>
      {editingComment && (
        <EditCommentForm
          show={!!editingComment}
          handleClose={handleCloseEdit}
          comment={editingComment}
          setError={setError}
        />
      )}
      {reportingComment && (
        <ReportForm
          show={!!reportingComment}
          handleClose={handleCloseReport}
          target={reportingComment}
          setError={setError}
        />
      )}
      {selectedPost && !showForm && (
        <PostDetail post={selectedPost} onClose={handleCloseModal} />
      )}
    </Card>
  );
};

export default UserComments;
