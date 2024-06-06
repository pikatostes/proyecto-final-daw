import React, { useState } from "react";
import Inventory from "../components/Inventory";
import FilterSelector from "../components/FilterSelector";
import { Col, Row, Button, Offcanvas } from "react-bootstrap";

const Pieces = () => {
  const [selectedFilters, setSelectedFilters] = useState({});
  const [showFilters, setShowFilters] = useState(false);

  const handleFilterChange = (filters) => {
    // Actualiza el estado de los filtros seleccionados
    setSelectedFilters(filters);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

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
          className="d-lg-none"
          data-bs-theme="dark"
        >
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
            limit={10}
            filteredColors={selectedFilters.colors}
          />
        </Col>
      </Row>
    </div>
  );
};

export default Pieces;
