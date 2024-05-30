// apiUtils.js
export const fetchUserData = async (userId) => {
  const response = await fetch(`http://localhost:8000/user/${userId}`);
  if (!response.ok) {
    throw new Error("Error fetching user data");
  }
  const data = await response.json();
  return data;
};

export const updateUserDetails = async (userId, username, email, avatar) => {
  const formData = new FormData();
  formData.append("username", username);
  formData.append("email", email);
  formData.append("avatar", avatar);

  const response = await fetch(`http://localhost:8000/user/${userId}/update`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Error updating user data");
  }

  const data = await response.json();
  return data;
};

export const fetchUserBillingInfo = async (userId) => {
  const response = await fetch(`http://localhost:8000/user/${userId}/billingInfo`);
  if (!response.ok) {
    throw new Error("Error fetching user billing info");
  }
  const data = await response.json();
  return data;
};

export const createBillingInfo = async (
  userId,
  address,
  city,
  state,
  zipCode,
  country
) => {
  const formData = new FormData();
  formData.append("user_id", userId);
  formData.append("address", address);
  formData.append("city", city);
  formData.append("state", state);
  formData.append("zip_code", zipCode);
  formData.append("country", country);

  try {
    const response = await fetch(
      `http://localhost:8000/user/${userId}/create/billingInfo`,
      {
        method: "POST",
        body: formData,
      }
    );

    // Verificar si la respuesta es exitosa
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Error creating billing information");
    }

    // Parsear y devolver la respuesta en formato JSON
    const data = await response.json();
    return data;
  } catch (error) {
    // Manejar errores y lanzar una excepción con el mensaje de error
    throw new Error(error.message);
  }
};
