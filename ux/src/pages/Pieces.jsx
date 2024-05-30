import React, { useState, useEffect } from "react";
import Inventory from "../components/Inventory";
import FilterSelector from "../components/FilterSelector";
import { Col, Row, Spinner, Button, Offcanvas } from "react-bootstrap";

const Pieces = () => {
  const [selectedFilters, setSelectedFilters] = useState({});
  const [inventoryData, setInventoryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchInventoryData = async () => {
      try {
        let url = "http://localhost:8000/piece/";
        // Construye la URL con los filtros seleccionados
        if (selectedFilters.colors || selectedFilters.categories) {
          const params = new URLSearchParams(selectedFilters);
          url += `?${params}`;
        }
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Error al obtener los datos");
        }
        const data = await response.json();
        setInventoryData(data);
        setLoading(false);
        setError(null);
      } catch (error) {
        console.error("Error:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchInventoryData();
  }, [selectedFilters]);

  const handleFilterChange = (filters) => {
    // Actualiza el estado de los filtros seleccionados
    setSelectedFilters(filters);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-dark">
        <Spinner animation="border" variant="light" />
      </div>
    );
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="container-fluid">
      <Row>
        {/* Columna para filtros en tamaños grandes */}
        <Col lg={2} className="d-none d-md-block">
          <h2>Filters</h2>
          <FilterSelector
            endpoint="http://localhost:8000/color/"
            onFilterChange={handleFilterChange}
            title="Color"
          />
          <br />
          <FilterSelector
            endpoint="http://localhost:8000/category/"
            onFilterChange={handleFilterChange}
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
          className="d-lg-none" data-bs-theme="dark">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Filters</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <FilterSelector
              endpoint="http://localhost:8000/color/"
              onFilterChange={handleFilterChange}
              title="Color"
            />
            <br />
            <FilterSelector
              endpoint="http://localhost:8000/category/"
              onFilterChange={handleFilterChange}
              title="Category"
            />
          </Offcanvas.Body>
        </Offcanvas>
        {/* Columna para mostrar inventario */}
        <Col lg={10} xs={12} className="overflow-auto">
          <Inventory
            inventoryData={inventoryData}
            limit={10}
            filteredColors={selectedFilters.colors}
            filteredCategories={selectedFilters.categories}
          />
        </Col>
      </Row>
    </div>
  );
};

export default Pieces;
