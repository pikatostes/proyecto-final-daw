import React, { useState, useEffect } from "react";
import { Container, Image, Table, Button, Spinner } from "react-bootstrap";
import UserEditForm from "./UserEditForm";

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
    // Lógica para eliminar usuario
    console.log(`Eliminar usuario con ID: ${userId}`);
  };

  if (loading) {
    return (
      <Container fluid className="d-flex justify-content-center align-items-center" style={{ minHeight: "50vh" }}>
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
      <div className="align-items-center">
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Username</th>
              <th>Roles</th>
              <th>Password</th>
              <th>Avatar</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.username}</td>
                <td>{user.roles}</td>
                <td>{user.password}</td>
                <td>
                  <Image
                    src={user.avatar}
                    alt={`Avatar de ${user.username}`}
                    height={50}
                    roundedCircle
                  />
                </td>
                <td>
                  <Button variant="primary" onClick={() => handleEdit(user)}>
                    Editar
                  </Button>{" "}
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(user.id)}
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
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
