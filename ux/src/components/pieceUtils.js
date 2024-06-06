export const newPiece = async (formData) => {
  console.log(formData);
  try {
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("category_id", formData.category);

    const response = await fetch("http://localhost:8000/piece/new", {
      method: "POST",
      body: formDataToSend, // Cambiar formData a formDataToSend
    });
    if (!response.ok) {
      throw new Error("Error al crear la pieza");
    }
    const data = await response.json();
    console.log("Pieza creada:", data);
  } catch (error) {
    console.error("Error:", error);
  }
};

export const deletePiece = async (pieceId) => {
  console.log("received id:", pieceId);
  try {
    const response = await fetch(`http://localhost:8000/piece/delete`, {
      method: "POST", // Cambiado de DELETE a POST
      headers: {
        "Content-Type": "application/json", // Añadido el encabezado Content-Type
      },
      body: JSON.stringify({ id: pieceId }),
    });
    if (!response.ok) {
      throw new Error("Error al eliminar la pieza");
    }
    console.log("Pieza eliminada");
  } catch (error) {
    console.error("Error:", error);
  }
};
