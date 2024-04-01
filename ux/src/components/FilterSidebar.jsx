import React from "react";
import { Button, Collapse, Form, FormGroup } from "react-bootstrap";

// Componente para un solo checkbox de filtro
const FilterCheckbox = ({ id, label }) => {
  return <Form.Check type="checkbox" id={id} label={label} />;
};

// Componente para un grupo de filtros
const FilterGroup = ({ title, children }) => {
  return (
    <FormGroup>
      <h4>{title}</h4>
      {children}
    </FormGroup>
  );
};

// Componente para el formulario de filtros
const FilterForm = () => {
  return (
    <Form>
      <FilterGroup title="Filtrar por Color">
        <FilterCheckbox id="colorRed" label="Rojo" />
        {/* Agrega más componentes FilterCheckbox para otros colores */}
      </FilterGroup>
      <FilterGroup title="Filtrar por Categoría">
        <FilterCheckbox id="categoryTechnic" label="Technic" />
        {/* Agrega más componentes FilterCheckbox para otras categorías */}
      </FilterGroup>
      <FilterGroup title="Filtrar por Temática">
        <FilterCheckbox id="themeSpace" label="Space" />
        {/* Agrega más componentes FilterCheckbox para otras temáticas */}
      </FilterGroup>
      <FormGroup>
        <h4>Filtrar por Precio</h4>
        <Form.Control
          type="number"
          id="minPriceFilter"
          placeholder="Precio mínimo"
        />
        <Form.Control
          type="number"
          id="maxPriceFilter"
          placeholder="Precio máximo"
          className="mt-2"
        />
      </FormGroup>
      <Button variant="danger" id="clearFiltersBtn">
        Eliminar filtros
      </Button>
    </Form>
  );
};

// Componente para la barra lateral de filtros
const FilterSidebar = () => {
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
          <FilterForm />
        </Collapse>
      </div>
    </aside>
  );
};

export default FilterSidebar;
