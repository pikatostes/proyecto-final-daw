import React, { useState } from "react";
import { Card } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";

function ColorCarousel({ colors }) {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const slides = colors.map((color, idx) => (
    <Carousel.Item key={idx}>
      <Card.Img
        variant="top"
        src={color.image} // Construir la URL completa de la imagen
        className="img-fluid img-thumbnail"
        alt={color.name}
        style={{ height: "", objectFit: "cover" }}
      />
    </Carousel.Item>
  ));

  return (
    <div style={{ maxWidth: "300px" }}>
      <Carousel activeIndex={index} onSelect={handleSelect} indicators={false}>
        {slides}
      </Carousel>
    </div>
  );
}

export default ColorCarousel;

