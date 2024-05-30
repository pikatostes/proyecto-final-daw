// apiUtils.js
export const registerUser = async (formDataToSend) => {
  const response = await fetch("http://localhost:8000/register", {
    method: "POST",
    body: formDataToSend,
  });
  if (!response.ok) {
    throw new Error("Failed to register user");
  }
  return response;
};

export const loginUser = async (formData) => {
  const response = await fetch("http://localhost:8000/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    throw new Error("Failed to login");
  }

  const data = await response.json();
  return data;
};

export const saveUserSession = (data) => {
  const userSession = data.user;
  const token = data.token;
  const userId = data.user_id;
  const userRole = data.user_role;

  console.log(data);

  localStorage.setItem("userSession", userSession);
  localStorage.setItem("user_id", userId);
  localStorage.setItem("token", token);
  localStorage.setItem("user_role", userRole);
};

export const logoutUser = () => {
  localStorage.removeItem("userSession");
  localStorage.removeItem("user_id");
  localStorage.removeItem("token");
  localStorage.removeItem("user_role");
  localStorage.removeItem("userData");
};

export const checkUserSession = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return false;
  }
  return true;
};

export const getUserData = async () => {
  const userId = localStorage.getItem("user_id");

  if (!userId) {
    console.error("No user ID found");
    return null;
  }

  try {
    const response = await fetch(`http://localhost:8000/user/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        console.error("Unauthorized");
        // Manejo del caso donde el token no es válido o ha expirado
      }
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};

export const getImageNames = async () => {
  try {
    const response = await fetch("http://localhost:8000/images");
    if (!response.ok) {
      throw new Error("Failed to fetch image names");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error.message);
    return [];
  }
};

export const fetchUserDataUsingToken = () => {
  const token = localStorage.getItem("token"); // Assuming the token is stored in localStorage

  if (!token) {
    logoutUser();
    throw new Error("No token found");
  }

  // Check if user data is already stored in localStorage
  const storedUserData = localStorage.getItem("userData");
  if (storedUserData) {
    return JSON.parse(storedUserData);
  }

  // Create a synchronous XMLHttpRequest to fetch user data
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "http://localhost:8000/api/user", false); // 'false' makes the request synchronous
  xhr.setRequestHeader("Authorization", `Bearer ${token}`);
  xhr.setRequestHeader("Content-Type", "application/json");

  try {
    xhr.send(null);

    if (xhr.status !== 200) {
      throw new Error("Network response was not ok");
    }

    const data = JSON.parse(xhr.responseText);
    const userData = {
      id: data.id,
      user: data.user,
      email: data.email,
      roles: data.roles,
      avatar: data.avatar,
    };

    // Store the user data in localStorage
    localStorage.setItem("userData", JSON.stringify(userData));

    return userData;
  } catch (error) {
    throw new Error(error.message);
  }
};
