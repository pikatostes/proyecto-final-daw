// FilterSelector.jsx
import React, { useState, useEffect } from "react";
import { ListGroup, Form, Accordion, AccordionBody } from "react-bootstrap";

const FilterSelector = ({ title, endpoint, renderFilter, onFilterChange }) => {
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        // Agregar la propiedad 'selected' a cada filtro para mantener el estado
        const filtersWithSelected = data.map((filter) => ({
          ...filter,
          selected: false,
        }));
        setFilters(filtersWithSelected);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [endpoint]);

  const handleCheckboxChange = (id) => {
    const updatedFilters = filters.map((filter) =>
      filter.id === id ? { ...filter, selected: !filter.selected } : filter
    );
    setFilters(updatedFilters);
    // Llama a la función onFilterChange pasando los filtros seleccionados
    const selectedFilters = updatedFilters.filter((filter) => filter.selected);
    console.log("Selected filters in FilterSelector:", selectedFilters);
    onFilterChange(selectedFilters);
  };

  if (filters.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="sidebar">
      <Accordion>
        <Accordion.Header>{title}</Accordion.Header>
        <Accordion.Body>
          <ListGroup>
            {filters.map((filter) => (
              <ListGroup.Item key={filter.id}>
                <Form.Check
                  type="checkbox"
                  id={`checkbox-${filter.id}`}
                  label={renderFilter ? renderFilter(filter) : filter.name}
                  checked={filter.selected}
                  onChange={() => handleCheckboxChange(filter.id)}
                />
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Accordion.Body>
      </Accordion>
    </div>
  );
};

export default FilterSelector;
