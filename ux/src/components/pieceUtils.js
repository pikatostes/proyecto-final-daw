export const deletePiece = async (pieceId) => {
    try {
        const response = await fetch(`http://localhost:8000/piece/delete/`, {
            method: "DELETE",
            body: JSON.stringify({ id: pieceId }),
        });
        if (!response.ok) {
            throw new Error("Error al eliminar la pieza");
        }
        console.log("Pieza eliminada");
    } catch (error) {
        console.error("Error:", error);
    }
}