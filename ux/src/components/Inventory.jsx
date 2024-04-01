import React, { useEffect, useState } from "react";

const Iventory = ({ api_key, limit }) => {
  const [inventoryParts, setInventoryParts] = useState([]);

  useEffect(() => {
    const fetchInventoryParts = async () => {
      try {
        const response = await fetch(
          `https://rebrickable.com/api/v3/lego/parts/?key=${api_key}&ordering=-quantity`
        );
        if (!response.ok) {
          throw new Error("Error al obtener los datos");
        }
        const data = await response.json();
        const parts = data.results.slice(0, limit);
        setInventoryParts(parts);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchInventoryParts();
  }, [api_key, limit]);

  if (inventoryParts.length === 0) {
    return <p>No se encontraron piezas de inventario de Lego.</p>;
  }

  return (
    <div className="row">
      {inventoryParts.map((part) => (
        <div key={part.part_num} className="col-md-3 col-4 mb-4">
          <div className="card" style={{ minHeight: "400px" }}>
            <img
              src={part.part_img_url}
              className="card-img-top"
              alt={part.name}
            />
            <div className="card-body">
              <h5 className="card-title">{part.name}</h5>
              <p>Colores: {part.colors ? part.colors.join(", ") : "N/A"}</p>
              <button className="btn btn-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-cart"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                </svg>{" "}
                Añadir al carrito
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Iventory;
