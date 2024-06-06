// apiUtils.js
const API_URL = "http://localhost:8000";
export const fetchPosts = async (apiUrl, setPosts, setLoading, setError) => {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Error al obtener los datos");
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

export const handleLike = async (postId, userId, posts, setPosts) => {
  try {
    const response = await fetch(`${API_URL}/post/${postId}/like`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id: userId, post_id: postId }),
    });

    if (!response.ok) {
      throw new Error("Error al dar me gusta a la publicación");
    }

    const result = await response.json();

    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        const totalLikes = result.liked
          ? post.totalLikes + 1
          : post.totalLikes - 1;
        return { ...post, totalLikes };
      }
      return post;
    });

    setPosts(updatedPosts);
  } catch (error) {
    console.error("Error:", error);
  }
};

export const createNewPost = async (formData) => {
  try {
    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("image", formData.image);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("username", formData.user_id);

    const response = await fetch(`${API_URL}/post/new`, {
      method: "POST",
      body: formDataToSend,
    });

    if (!response.ok) {
      throw new Error("Failed to create post");
    }
    console.log("Post created successfully");
    return true;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const updatePost = async (postId, postData) => {
  const formData = new FormData();
  for (const key in postData) {
    if (postData[key] !== null) {
      formData.append(key, postData[key]);
    }
  }

  const response = await fetch(`${API_URL}/post/${postId}/update`, {
    method: "PATCH",
    body: formData,
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(responseData.error || "Error updating post");
  }

  return responseData;
};

export const handleDeletePost = async (postId, posts, setPosts, setError) => {
  try {
    const response = await fetch(`${API_URL}/post/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: postId }),
    });
    if (!response.ok) {
      throw new Error("Error al eliminar el comentario");
    }
    setPosts(posts.filter((post) => post.id !== postId));
  } catch (error) {
    console.error("Error:", error);
    setError("Error al eliminar el post");
  }
};

export const handleReportPost = async (
  postId,
  userId,
  description,
  setError
) => {
  try {
    const response = await fetch(`${API_URL}/post/report`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        post_id: postId,
        user_id: userId,
        description: description,
      }),
    });
    if (!response.ok) {
      throw new Error("Error al reportar el comentario");
    }
  } catch (error) {
    console.error("Error:", error);
    setError("Error al reportar el post");
  }
};

export const createPostCategory = async (categoryData) => {
  try {
    const formData = new FormData();
    formData.append("name", categoryData.name);
    formData.append("image", categoryData.image);

    const response = await fetch(`${API_URL}/post/category/new`, {
      method: "POST",
      body: formData,
    });
    if (!response.ok) {
      throw new Error("Error al crear la categoría");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

export const updatePostCategory = async (category) => {
  console.log(category)
  try {
    const formData = new FormData();
    formData.append("id", category.id);
    formData.append("name", category.name);
    formData.append("image", category.image);

    const response = await fetch(`${API_URL}/post/category/update`, {
      method: "PATCH",
      body: formData,
    });
    if (!response.ok) {
      throw new Error("Error al actualizar la categoría");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

export const deletePostCategory = async (categoryId) => {
  try {
    const response = await fetch(
      `${API_URL}/post/category/${categoryId}/delete`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) {
      throw new Error("Error al eliminar la categoría");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

export const fetchCategories = async () => {
  try {
    const response = await fetch(`${API_URL}/post/category`);
    if (!response.ok) {
      throw new Error("Error al obtener las categorías");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
