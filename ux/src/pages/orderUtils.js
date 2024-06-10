export const createOrder = async (formData) => {
  console.log(formData);
  try {
    const response = await fetch("http://localhost:8000/order/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData), // Convert formData to JSON string
    });

    if (!response.ok) {
      throw new Error("Error al crear la orden");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const getOrders = async (userId) => {
  try {
    const response = await fetch(`http://localhost:8000/order/get`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id: userId }),
    });

    if (!response.ok) {
      throw new Error("Error al obtener las órdenes");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
