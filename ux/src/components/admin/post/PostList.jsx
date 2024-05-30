import React, { useState, useEffect } from "react";
import { Container, Image, Table, Button, Row, Col } from "react-bootstrap";

const PostList = ({ apiUrl }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Error al obtener los datos de usuarios");
        }
        const data = await response.json();
        setPosts(data);
        setLoading(false);
        setError(null);
      } catch (error) {
        console.error("Error:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleEdit = (postId) => {
    // Lógica para editar usuario
    console.log(`Editar usuario con ID: ${postId}`);
  };

  const handleDelete = (postId) => {
    // Lógica para eliminar usuario
    console.log(`Eliminar usuario con ID: ${postId}`);
  };

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <Container fluid>
      <h2>Lista de Usuarios</h2>
      <div className="align-items-center">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Created At</th>
              <th>Updated At</th>
              <th>User_Id_Id</th>
              <th>Category</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>{post.description}</td>
                <td>{post.created_at}</td>
                <td>{post.updated_at}</td>
                <td>{post.user_id_id}</td>
                <td>{post.category_id}</td>
                <td>
                  <Image
                    src={post.image}
                    alt={`Image de ${post.title}`}
                    width={100}
                    fluid
                    thumbnail
                  />
                </td>
                <td>
                  <Button variant="primary" onClick={() => handleEdit(post.id)}>
                    Editar
                  </Button>{" "}
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(post.id)}
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default PostList;
