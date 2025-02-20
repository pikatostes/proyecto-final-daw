export const newPiece = async (formData) => {
  try {
    const response = await fetch(import.meta.env.VITE_API_URL + "/piece/new", {
      method: "POST",
      body: formData, // Cambiar formData a formDataToSend
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
  try {
    const response = await fetch(import.meta.env.VITE_API_URL + `/piece/delete`, {
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

export const newPieceDetail = async (formData) => {
  try {
    const response = await fetch(import.meta.env.VITE_API_URL + "/piece/detail/new", {
      method: "POST",
      body: formData,
    });
    if (!response.ok) {
      throw new Error("Error al crear el detalle de la pieza");
    } else {
      const data = await response.json();
      console.log("Detalle creada:", data);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
