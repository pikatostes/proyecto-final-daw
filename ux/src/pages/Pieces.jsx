import React, { useState, useEffect } from "react";
import Inventory from "../components/Inventory";
import FilterSelector from "../components/FilterSelector";
import { Col, Row, Button, Offcanvas } from "react-bootstrap";

const Pieces = () => {
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [pieces, setPieces] = useState([]);

  useEffect(() => {
    const fetchPieces = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_API_URL + "/piece/shop");
        if (!response.ok) {
          throw new Error("Failed to fetch pieces");
        }
        const data = await response.json();
        console.log("Fetched pieces:", data);
        setPieces(data);
      } catch (error) {
        console.error("Error fetching pieces:", error);
      }
    };

    fetchPieces();
  }, []);

  const handleColorFilterChange = (filters) => {
    const colors = filters.map(filter => filter.name);
    console.log("Selected colors:", colors);
    setSelectedColors(colors);
  };

  const handleCategoryFilterChange = (filters) => {
    const categories = filters.map(filter => filter.name);
    console.log("Selected categories:", categories);
    setSelectedCategories(categories);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const filteredPieces = pieces.filter(piece => {
    const matchesColor = selectedColors.length === 0 || piece.colors.some(color => selectedColors.includes(color.name));
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(piece.category);
    console.log(`Piece ${piece.name} matchesColor: ${matchesColor}, matchesCategory: ${matchesCategory}`);
    return matchesColor && matchesCategory;
  });

  console.log("Filtered pieces:", filteredPieces);

  return (
    <div className="container-fluid">
      <Row>
        {/* Columna para filtros en tamaños grandes */}
        <Col lg={2} className="d-none d-md-block">
          <h2>Filters</h2>
          <FilterSelector
            endpoint={import.meta.env.VITE_API_URL + "/color/"}
            onFilterChange={handleColorFilterChange}
            title="Color"
          />
          <br />
          <FilterSelector
            endpoint={import.meta.env.VITE_API_URL + "/category"}
            onFilterChange={handleCategoryFilterChange}
            title="Category"
          />
        </Col>
        {/* Botón para mostrar filtros en tamaños pequeños */}
        <Col xs={12} className="d-md-none">
          <Button onClick={toggleFilters}>Show Filters</Button>
          <br />
        </Col>
        {/* Offcanvas para filtros en tamaños pequeños */}
        <Offcanvas
          placement="start"
          show={showFilters}
          onHide={() => setShowFilters(false)}
          className="d-lg-none"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Filters</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <FilterSelector
              endpoint={import.meta.env.VITE_API_URL + "/color/"}
              onFilterChange={handleColorFilterChange}
              title="Color"
            />
            <br />
            <FilterSelector
              endpoint={import.meta.env.VITE_API_URL + "/category"}
              onFilterChange={handleCategoryFilterChange}
              title="Category"
            />
          </Offcanvas.Body>
        </Offcanvas>
        {/* Columna para mostrar inventario */}
        <Col lg={10} xs={12} className="overflow-auto">
          <Inventory pieces={filteredPieces} />
        </Col>
      </Row>
    </div>
  );
};

export default Pieces;
