export const deleteCommentReport = async (commentReportId) => {
  try {
    const data = { id: commentReportId };
    const response = await fetch(
      "http://localhost:8000/comment/report/delete",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      throw new Error("Error al eliminar el reporte de comentario");
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
