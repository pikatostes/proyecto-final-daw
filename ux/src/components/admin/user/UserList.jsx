import React, { useState, useEffect } from "react";
import { Container, Image, Spinner, Row, Col, Card } from "react-bootstrap";
import UserEditForm from "./UserEditForm";
import ThreePointsButton from "../../ThreePointsButton";
import { deleteUser } from "./userAdminUtils";

const UserList = ({ apiUrl }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Error al obtener los datos de usuarios");
        }
        const data = await response.json();
        setUsers(data);
        setLoading(false);
        setError(null);
      } catch (error) {
        console.error("Error:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, [apiUrl]);

  const handleEdit = (user) => {
    setSelectedUser(user);
  };

  const handleDelete = (userId) => {
    deleteUser(userId);
    console.log(`Eliminar usuario con ID: ${userId}`);
  };

  if (loading) {
    return (
      <Container
        fluid
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "50vh" }}
      >
        <Spinner animation="border" role="status" />
      </Container>
    );
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <Container fluid>
      <h2>Lista de Usuarios</h2>
      {users.map((user) => (
        <Card key={user.id} className="mb-2" style={{ height: "auto" }}>
          <Row className="align-items-center p-2">
            <Col xs={3}>
              <Image
                src={user.avatar}
                alt={`Avatar de ${user.username}`}
                roundedCircle
                fluid
                width={100}
              />
            </Col>
            <Col xs={9}>
              <Row className="align-items-center">
                <Col xs={10}>{user.username}</Col>
                <Col xs={2} className="d-flex justify-content-end">
                  <ThreePointsButton
                    target={user}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                </Col>
              </Row>
              {user.roles}
            </Col>
          </Row>
        </Card>
      ))}
      {selectedUser && ( // Renderizar UserEditForm si hay un usuario seleccionado
        <UserEditForm
          userData={selectedUser}
          onClose={() => setSelectedUser(null)} // Cerrar el modal al salir
        />
      )}
    </Container>
  );
};

export default UserList;
