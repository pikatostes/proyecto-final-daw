import React from "react";
import CarouselComponent from "../components/Carousel";

const Home = () => {
  const imageSizes = ["800x400", "800x600", "800x500"]; // Ejemplo de tamaños de imágenes

  return (
    <>
      <h1>Welcome to the Main Page</h1>
      <CarouselComponent carouselSize="carousel-md" imageSizes={imageSizes} />
    </>
  );
};

export default Home;
