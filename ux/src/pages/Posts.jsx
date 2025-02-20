import React, { useState, useEffect } from "react";
import {
  Col,
  Container,
  Row,
  Button,
  Form,
  FormControl,
  ListGroup,
  Image,
  Spinner,
  InputGroup,
} from "react-bootstrap";
import PostsList from "../components/PostsList";
import PostForm from "../components/PostForm";
import PostCategory from "../components/PostCategory";
import debounce from "lodash/debounce";
import { PencilSquare, Search } from "react-bootstrap-icons";
import PostDetail from "../components/PostDetail";

const Posts = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState({
    users: [],
    posts: [],
    postCategories: [],
  });
  const [loading, setLoading] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    if (searchQuery) {
      const fetchData = async () => {
        try {
          setLoading(true);
          const response = await fetch(
            import.meta.env.VITE_API_URL + `/api/search?query=${searchQuery}`
          );
          const data = await response.json();
          setSearchResults(data);
        } catch (error) {
          console.error("Error fetching search results:", error);
        } finally {
          setLoading(false);
        }
      };

      const debouncedFetchData = debounce(fetchData, 300);
      debouncedFetchData();

      return () => {
        debouncedFetchData.cancel();
      };
    } else {
      setSearchResults({ users: [], posts: [], postCategories: [] });
    }
  }, [searchQuery]);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  const handleCreatePost = () => handleCloseModal();
  const handleSelectCategory = (category) => setSelectedCategory(category);
  const handleSelectPost = (post) => setSelectedPost(post);
  const handleClosePostDetail = () => setSelectedPost(null);

  const handleUserClick = (username) => {
    window.location.href = `/profile/${username}`;
  };

  return (
    <Container data-bs-theme="dark">
      <Row>
        <Col xs={12} md={3}>
          <PostCategory
            apiUrl={import.meta.env.VITE_API_URL + "/post/category"}
            onSelectCategory={handleSelectCategory}
          />
        </Col>
        <Col xs={12} md={9}>
          <Form>
            <InputGroup className="mb-3">
              <InputGroup.Text>
                <Search />
              </InputGroup.Text>
              <FormControl
                type="text"
                placeholder="Buscar"
                className="mr-sm-2"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </InputGroup>
          </Form>
          <Row style={{ position: "absolute", zIndex: 1 }}>
            {loading ? (
              <Spinner animation="border" role="status" />
            ) : (
              <>
                <Col>
                  <ListGroup>
                    {searchResults.users.map((user, index) => (
                      <ListGroup.Item
                        key={index}
                        onClick={() => handleUserClick(user.username)}
                        style={{ cursor: "pointer" }}
                      >
                        <Row className="align-items-center">
                          <Col xs={4}>
                            <Image
                              src={user.avatar}
                              fluid
                              roundedCircle
                              width={50}
                            />
                          </Col>
                          <Col xs={8}>{user.username}</Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Col>
                <Col>
                  <ListGroup>
                    {searchResults.posts.map((post, index) => (
                      <ListGroup.Item
                        key={index}
                        onClick={() => handleSelectPost(post)}
                        style={{ cursor: "pointer" }}
                      >
                        <Image src={post.image} fluid thumbnail width={35} />
                        {post.title}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Col>
              </>
            )}
          </Row>
          <PostsList
            apiUrl={import.meta.env.VITE_API_URL + "/post/"}
            category={selectedCategory}
          />
        </Col>
      </Row>

      {/* Botón flotante */}
      <Button
        variant="primary"
        onClick={handleShowModal}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: "1", // Asegura que esté por encima de otros elementos
        }}
      >
        <PencilSquare /> New Post
      </Button>

      <PostForm
        show={showModal}
        handleClose={handleCloseModal}
        handleCreatePost={handleCreatePost}
      />

      {selectedPost && (
        <PostDetail post={selectedPost} onClose={handleClosePostDetail} />
      )}
    </Container>
  );
};

export default Posts;
