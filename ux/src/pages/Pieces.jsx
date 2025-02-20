import React, { useState, useEffect } from "react";
import Inventory from "../components/Inventory";
import FilterSelector from "../components/FilterSelector";
import { Col, Row, Button, Offcanvas, Spinner } from "react-bootstrap";

const Pieces = () => {
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [pieces, setPieces] = useState([]);
  const [loading, setLoading] = useState(true); // Estado para gestionar el indicador de carga
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 24;

  useEffect(() => {
    const fetchPieces = async () => {
      try {
<<<<<<< HEAD
        const response = await fetch(import.meta.env.VITE_API_URL + "/piece/shop");
=======
        setLoading(true);
        const response = await fetch("http://localhost:8000/piece/shop");
>>>>>>> 8829acdc65f948c75a6fbfd5366b86948bb9b779
        if (!response.ok) {
          throw new Error("Failed to fetch pieces");
        }
        const data = await response.json();
        setPieces(data);
      } catch (error) {
        console.error("Error fetching pieces:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPieces();
  }, []);

  const handleColorFilterChange = (filters) => {
    const colors = filters.map(filter => filter.name);
    setSelectedColors(colors);
    setCurrentPage(1); // Reset page to 1 when filters change
  };

  const handleCategoryFilterChange = (filters) => {
    const categories = filters.map(filter => filter.name);
    setSelectedCategories(categories);
    setCurrentPage(1); // Reset page to 1 when filters change
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const filteredPieces = pieces.filter(piece => {
    const matchesColor = selectedColors.length === 0 || piece.colors.some(color => selectedColors.includes(color.name));
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(piece.category);
    return matchesColor && matchesCategory;
  });

  const indexOfLastPiece = currentPage * itemsPerPage;
  const indexOfFirstPiece = indexOfLastPiece - itemsPerPage;
  const currentPieces = filteredPieces.slice(indexOfFirstPiece, indexOfLastPiece);
  const totalPages = Math.ceil(filteredPieces.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container-fluid">
      <Row>
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
        <Col xs={12} className="d-md-none">
          <Button onClick={toggleFilters}>Show Filters</Button>
          <br />
        </Col>
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
        <Col lg={10} xs={12} className="overflow-auto">
          {loading ? (
            <div className="d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : (
            <>
              <Inventory pieces={currentPieces} />
              <div className="d-flex justify-content-center mt-3">
                {[...Array(totalPages)].map((_, index) => (
                  <Button
                    key={index}
                    variant={index + 1 === currentPage ? "primary" : "outline-primary"}
                    onClick={() => handlePageChange(index + 1)}
                    className="me-2"
                  >
                    {index + 1}
                  </Button>
                ))}
              </div>
            </>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default Pieces;
