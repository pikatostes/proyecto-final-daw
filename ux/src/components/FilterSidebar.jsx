import React, { useState, useEffect } from "react";
import { Button, Collapse, Form, FormGroup } from "react-bootstrap";

const FilterCheckbox = ({ id, label }) => {
  return <Form.Check type="checkbox" id={id} label={label} />;
};

const FilterGroup = ({ title, children }) => {
  return (
    <FormGroup>
      <h4>{title}</h4>
      {children}
    </FormGroup>
  );
};

const FilterForm = ({ colors }) => {
  return (
    <Form>
      <FilterGroup title="Filtrar por Color">
        {colors.map((color) => (
          <FilterCheckbox
            key={color.id}
            id={`color${color.id}`}
            label={color.name}
          />
        ))}
      </FilterGroup>
      {/* Agrega otros grupos de filtros aquí */}
      <Button variant="danger" id="clearFiltersBtn">
        Eliminar filtros
      </Button>
    </Form>
  );
};

const FilterSidebar = ({ apiUrl }) => {
  const [colors, setColors] = useState([]);

  useEffect(() => {
    const fetchColors = async () => {
      try {
        const response = await fetch(apiUrl); // Usar la prop apiUrl aquí
        if (!response.ok) {
          throw new Error("Error al obtener los colores");
        }
        const data = await response.json();
        setColors(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchColors();
  }, [apiUrl]);

  return (
    <aside className="col-lg-3">
      <div className="aside">
        <Button
          variant="secondary"
          className="d-lg-none mt-3 mb-3"
          id="filterButton"
          data-toggle="collapse"
          data-target="#filtersCollapse"
        >
          Filtrar
        </Button>
        <Collapse id="filtersCollapse">
          <FilterForm colors={colors} />
        </Collapse>
      </div>
    </aside>
  );
};

export default FilterSidebar;
