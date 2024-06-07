import React, { useState, useEffect } from "react";
import { Nav } from "react-bootstrap";

const PostCategory = ({ apiUrl, userId, onSelectCategory }) => {
  const [categories, setCategories] = useState([]);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    // Verificar el tamaño de la pantalla al cargar la página
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 768); // Considerar como "pequeña" una pantalla menor a 768px de ancho
    };

    // Verificar el tamaño de la pantalla al cargar y al redimensionar
    window.addEventListener("resize", checkScreenSize);
    checkScreenSize();

    return () => {
      // Limpiar el event listener al desmontar el componente
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  useEffect(() => {
    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id: userId }),
    })
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, [apiUrl, userId]);

  const handleSelect = (eventKey) => {
    onSelectCategory(eventKey);
  };

  if (isSmallScreen) {
    return (
      <div
        style={{ overflowX: "auto", whiteSpace: "nowrap", padding: "10px 0" }}
      >
        <Nav
          justify
          variant="pills"
          className="flex-nowrap"
          onSelect={handleSelect}
          style={{ display: "flex", flexWrap: "nowrap" }}
        >
          <Nav.Item style={{ display: "inline-block" }}>
            <Nav.Link eventKey="">All</Nav.Link>
          </Nav.Item>
          {categories.map((category) => (
            <Nav.Item key={category.id} style={{ display: "inline-block" }}>
              <Nav.Link eventKey={category.name}>{category.name}</Nav.Link>
            </Nav.Item>
          ))}
        </Nav>
      </div>
    );
  } else {
    return (
      <Nav
        justify
        variant="pills"
        className="flex-md-column flex-sm-row"
        onSelect={handleSelect}
      >
        <Nav.Item>
          <Nav.Link eventKey="">All</Nav.Link>
        </Nav.Item>
        {categories.map((category) => (
          <Nav.Item key={category.id}>
            <Nav.Link eventKey={category.name}>{category.name}</Nav.Link>
          </Nav.Item>
        ))}
      </Nav>
    );
  }
};

export default PostCategory;
