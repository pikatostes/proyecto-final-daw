export const updateUser = async (formData) => {
  try {
    const response = await fetch(import.meta.env.VITE_API_URL + "/admin/user/edit", {
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
<<<<<<< HEAD
    const data = { id: userId };
    const response = await fetch(import.meta.env.VITE_API_URL + "/admin/user/delete", {
      method: "DELETE",
=======
    const formData = new FormData();
    formData.append("id", userId);
    const response = await fetch("http://localhost:8000/admin/user/delete", {
      method: "POST",
>>>>>>> 8829acdc65f948c75a6fbfd5366b86948bb9b779
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
