import React, { useEffect, useState } from "react";

const Inventory = ({ api_url, limit }) => {
  const [inventoryPieces, setInventoryPieces] = useState([]);

  useEffect(() => {
    const fetchInventoryPieces = async () => {
      try {
        const response = await fetch(api_url);
        if (!response.ok) {
          throw new Error("Error al obtener los datos");
        }
        const data = await response.json();
        const pieces = data.slice(0, limit);
        setInventoryPieces(pieces);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchInventoryPieces();
  }, [api_url, limit]);

  if (inventoryPieces.length === 0) {
    return <p>No se encontraron piezas de inventario de Lego.</p>;
  }

  return (
    <div className="row">
      {inventoryPieces.map((piece) => (
        <div key={piece.id} className="col-md-3 col-4 mb-4">
          <div className="card" style={{ minHeight: "400px" }}>
            <img
              src={piece.image}
              className="card-img-top"
              alt={piece.name}
              style={{ height: "200px", objectFit: "cover" }}
            />
            <div className="card-body">
              <h5 className="card-title">{piece.name}</h5>
              <p>Precio: ${piece.price}</p>
              <p>Stock: {piece.stock}</p>
              <p>Descripción: {piece.description}</p>
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

export default Inventory;
