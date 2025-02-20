import React, { useState, useEffect } from "react";
import { Card, Button, Row, Col, Image, Spinner, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import PostDetail from "./PostDetail";
import { fetchPosts, handleLike, handleDeletePost } from "./postUtils";
import PostForm from "./PostForm";
import ReportForm from "./ReportForm";
import ThreePointsButton from "./ThreePointsButton"; // Importar ThreePointsButton
import { HeartFill } from "react-bootstrap-icons";

const PostsList = ({ apiUrl, category }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [postToReport, setPostToReport] = useState(null);

  const userId = localStorage.getItem("user_id");
  const userSession = localStorage.getItem("userSession");

  useEffect(() => {
    fetchPosts(apiUrl, setPosts, setLoading, setError);
  }, [apiUrl]);

  const handleCardClick = (post) => {
    setSelectedPost(post);
  };

  const handleCloseModal = () => {
    setSelectedPost(null);
  };

  const handleEditPost = (post) => {
    setSelectedPost(post);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setSelectedPost(null);
    setShowForm(false);
  };

  const handleReportPostClick = (post) => {
    setPostToReport(post);
    setShowReportModal(true);
  };

  const handleCloseReportModal = () => {
    setPostToReport(null);
    setShowReportModal(false);
  };

  const handleDeletePostWrapper = (postId) => {
    handleDeletePost(postId, posts, setPosts, setError);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-dark">
        <Spinner animation="border" variant="light" />
      </div>
    );
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  // Filtrar los posts por la categoría especificada
  const filteredPosts = category
    ? posts.filter((post) => post.category === category)
    : posts;

  return (
    <Container fluid>
      {category && <h2>Posts de {category}</h2>}
      {filteredPosts.map((post) => (
        <Card
          className="mb-3"
          onClick={() => handleCardClick(post)}
          key={post.id}
          data-bs-theme="dark"
          category={post.category}
        >
          <Card.Body>
            <Row>
              <Col xs={6} md={4} lg={2}>
                <Card.Img src={post.image} />
              </Col>
              <Col xs={6} md={8} lg={10}>
                <Row className="d-flex align-items-center justify-center">
                  <Col xs={9} md={10}>
                    <Card.Text>
                      <Image src={post.avatar} roundedCircle width={25} />{" "}
                      <strong>{post.user}</strong>
                    </Card.Text>
                  </Col>
                  <Col
                    xs={3}
                    md={2}
                    onClick={(e) => e.stopPropagation()} // Detener la propagación del evento de clic
                  >
                    <ThreePointsButton
                      target={post}
                      onEdit={handleEditPost}
                      onDelete={handleDeletePostWrapper}
                      onReport={handleReportPostClick}
                      userSession={userSession}
                    />
                  </Col>
                </Row>
                <Card.Title>{post.title}</Card.Title>
                <Button
                  variant="danger"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLike(post.id, userId, posts, setPosts);
                  }}
                >
                  {post.totalLikes} <HeartFill />
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      ))}
      {selectedPost && !showForm && (
        <PostDetail post={selectedPost} onClose={handleCloseModal} />
      )}
      {showForm && (
        <PostForm
          show={showForm}
          handleClose={handleCloseForm}
          post={selectedPost}
        />
      )}
      {showReportModal && postToReport && (
        <ReportForm
          show={showReportModal}
          handleClose={handleCloseReportModal}
          target={postToReport}
          setError={setError}
        />
      )}
    </Container>
  );
};

export default PostsList;
