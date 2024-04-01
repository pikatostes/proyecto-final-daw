// CarouselComponent.jsx
import React from 'react';
import { Carousel } from 'react-bootstrap';

const CarouselComponent = ({ carouselSize, imageSizes }) => {
    return (
        <Carousel className={carouselSize}>
            {imageSizes.map((size, index) => (
                <Carousel.Item key={index}>
                    <img
                        className="d-block w-100"
                        src={`https://via.placeholder.com/${size}`}
                        alt={`Slide ${index + 1}`}
                    />
                </Carousel.Item>
            ))}
        </Carousel>
    );
};

export default CarouselComponent;
