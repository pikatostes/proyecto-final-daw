// commentUtils.js

export const fetchComments = async (postId, setComments, setLoading) => {
  try {
    const response = await fetch(import.meta.env.VITE_API_URL + `/comment/${postId}`);
    if (!response.ok) {
      throw new Error("Error al obtener los comentarios");
    }
    
    const data = await response.json();
    setLoading(false);
    
    if (Array.isArray(data) && data.length === 0) {
      console.log("No hay más comentarios.");
      return;
    }

    setComments(data);
  } catch (error) {
    setLoading(false);
    console.error("Error:", error);
  }
};

export const sendComment = async (postData) => {
  try {
    const response = await fetch(import.meta.env.VITE_API_URL + "/comment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      throw new Error("Error al enviar el comentario");
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const deleteComment = async (commentId) => {
  console.log(commentId)
  try {
    const response = await fetch(import.meta.env.VITE_API_URL + `/comment/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: commentId }),
    });
    if (!response.ok) {
      throw new Error("Error al eliminar el comentario");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

export const fetchUserComments = async (userSession, setUserComments, setLoading, setError) => {
  try {
    const response = await fetch(import.meta.env.VITE_API_URL + `/user/${userSession}/comments`);
    if (!response.ok) {
      throw new Error("Error al obtener los comentarios");
    }
    const data = await response.json();
    setUserComments(data);
    setLoading(false);
  } catch (error) {
    console.error("Error fetching user data:", error);
    setError("Error al cargar los comentarios");
    setLoading(false);
  }
};

export const handleDeleteComment = async (commentId, userComments, setUserComments, setError) => {
  try {
    const response = await fetch(import.meta.env.VITE_API_URL + `/comment/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: commentId }),
    });
    if (!response.ok) {
      throw new Error("Error al eliminar el comentario");
    }
    setUserComments(userComments.filter((comment) => comment.id !== commentId));
  } catch (error) {
    console.error("Error:", error);
    setError("Error al eliminar el comentario");
  }
};

export const editComment = async (commentId, newText) => {
  try {
    const response = await fetch(import.meta.env.VITE_API_URL + `/comment/edit`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: commentId, text: newText }),
    });
    if (!response.ok) {
      throw new Error("Error al editar el comentario");
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const reportComment = async (commentId, userId, description, setError) => {
  try {
    const response = await fetch(import.meta.env.VITE_API_URL + `/report/comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: commentId, userId, description }),
    });
    if (!response.ok) {
      throw new Error("Error al reportar el comentario");
    }
  } catch (error) {
    console.error("Error:", error);
    setError("Error al reportar el comentario");
  }
};
