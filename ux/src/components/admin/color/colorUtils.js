export const createColor = async (formData) => {
    console.log(formData);
    try {
        const formDataToSend = new FormData();
        formDataToSend.append("name", formData.name);
        const response = await fetch("http://localhost:8000/color/new", {
            method: "POST",
            body: formDataToSend,
        });
        if (!response.ok) {
            throw new Error("Error al crear el color");
        } else {
            const data = await response.json();
            console.log("Color creado:", data);
        }
    } catch (error) {
        console.error("Error:", error);
    }
}