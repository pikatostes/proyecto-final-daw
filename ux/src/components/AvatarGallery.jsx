import React from "react";
import { Container, Form, Image } from "react-bootstrap";
import { CheckCircle } from 'react-bootstrap-icons';

const AvatarGallery = ({ images, selectedImage, handleImageClick }) => {
  return (
    <Form.Group controlId="avatarGallery" className="mb-3">
      <Form.Label>Select an Avatar from gallery</Form.Label>
      <Container className="d-flex flex-wrap" fluid style={{ maxHeight: "35vh", overflowX: "auto" }}>
        {Object.entries(images).map(([key, imageName]) => (
          <div key={key} className="position-relative m-1">
            <Image
              roundedCircle
              src={`http://localhost:8000/images/${imageName}`}
              onClick={() => handleImageClick(imageName)}
              style={{ cursor: "pointer", opacity: selectedImage === imageName ? 0.5 : 1 }}
              width={63}
              fluid
              className="image-gallery"
            />
            {selectedImage === imageName && (
              <CheckCircle
                className="position-absolute top-50 start-50 translate-middle"
                style={{ color: "green", fontSize: "1.5rem" }}
              />
            )}
          </div>
        ))}
      </Container>
    </Form.Group>
  );
};

export default AvatarGallery;
