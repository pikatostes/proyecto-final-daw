export const updateUser = async (formData) => {
  try {
    const response = await fetch("http://localhost:8000/admin/user/edit", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Error al actualizar el usuario");
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const deleteUser = async (userId) => {
  try {
    const formData = new FormData();
    formData.append("id", userId);
    const response = await fetch("http://localhost:8000/admin/user/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Error al eliminar el usuario");
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
