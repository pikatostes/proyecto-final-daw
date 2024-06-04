export const deleteUser = async (userId) => {
  try {
    const data = { id: userId };
    const response = await fetch("http://localhost:8000/admin/user/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Error al eliminar el usuario");
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};