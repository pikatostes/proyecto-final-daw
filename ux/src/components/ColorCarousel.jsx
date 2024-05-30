import React, { useState } from "react";
import { Card } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";

function ColorCarousel({ colors }) {
  const [index, setIndex] = useState(0);

  // Convertimos el objeto de colores en un array de entradas [key, value]
  const colorEntries = Object.entries(colors);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const slides = colorEntries.map(([color, image], index) => (
    <Carousel.Item key={index}>
      <Card.Img
        variant="top"
        src={image} // construir la URL completa de la imagen
        className="img-fluid img-thumbnail"
        alt={color.image}
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
