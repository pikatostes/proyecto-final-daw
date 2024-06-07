import React, { useEffect, useState } from "react";
import { Col, Container, Image, Row, Spinner } from "react-bootstrap";
import { fetchComments, deleteComment } from "./commentUtils";
import ThreePointsButton from "./ThreePointsButton";
import EditCommentForm from "./EditCommentForm";
import ReportForm from "./ReportForm";

const PostComments = ({ post, comments, setComments }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingComment, setEditingComment] = useState(null);
  const [reportingComment, setReportingComment] = useState(null);

  useEffect(() => {
    if (comments.length === 0) {
      fetchComments(post.id, setComments, setLoading);
    } else {
      setLoading(false);
    }
  }, [comments, post.id, setComments]);

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

  if (loading) {
    return (
      <Container fluid className="d-flex justify-content-center align-items-center" style={{ minHeight: "50vh" }}>
        <Spinner animation="border" role="status" />
      </Container>
    );
  }

  const userSession = localStorage.getItem("userSession");

  return (
    <Container style={{ maxHeight: "50vh", overflowY: "auto" }}>
      {error && <div className="alert alert-danger">{error}</div>}
      {comments.map((comment) => (
        <Row key={comment.id} className="d-flex justify-center align-items-center mb-3">
          <Col xs={3} md={4} lg={2}>
            <Image src={comment.avatar} roundedCircle fluid />
          </Col>
          <Col xs={9} md={8} lg={10}>
            <Row>
              <Col xs={10} md={9} lg={11}>
                <strong className="mr-auto">{comment.user}</strong>
              </Col>
              <Col xs={2} md={3} lg={1}>
                <ThreePointsButton
                  target={comment}
                  onEdit={handleEditComment}
                  onDelete={handleDeleteComment}
                  onReport={handleReportComment}
                  userSession={userSession}
                />
              </Col>
            </Row>
            <div>{comment.text}</div>
          </Col>
        </Row>
      ))}
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
    </Container>
  );
};

export default PostComments;
