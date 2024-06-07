import React, { useState, useEffect } from "react";
import { Button, Card, Spinner, Modal, Form } from "react-bootstrap";
import { fetchUserBillingInfo, createBillingInfo } from "./profileUtil";

const BillingInfo = () => {
  const [userBillingInfo, setUserBillingInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false); // State for modal visibility
  const [formData, setFormData] = useState({
    address: "",
    city: "",
    state: "",
    zip_code: "",
    country: ""
  }); // State for form data

  useEffect(() => {
    const userSession = localStorage.getItem("user_id");
    if (userSession) {
      fetchUserBillingInfo(userSession)
        .then((data) => {
          setUserBillingInfo(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          setLoading(false);
        });
    }
  }, []);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userSession = localStorage.getItem("user_id");
    if (userSession) {
      try {
        await createBillingInfo(
          userSession,
          formData.address,
          formData.city,
          formData.state,
          formData.zip_code,
          formData.country
        );
        setShowModal(false);
        fetchUserBillingInfo(userSession).then((data) => setUserBillingInfo(data));
      } catch (error) {
        console.error("Error creating billing info:", error);
      }
    }
  };

  return (
    <Card>
      <Card.Header>
        Billing Info
        <Button variant="primary" style={{ float: "right" }} onClick={handleShowModal}>
          New
        </Button>
      </Card.Header>
      <Card.Body>
        {loading ? (
          <Spinner animation="border" />
        ) : userBillingInfo.length > 0 ? (
          userBillingInfo.map((info, index) => (
            <div key={index}>
              <p>
                <strong>Address:</strong> {info.address}
              </p>
              <p>
                <strong>City:</strong> {info.city}
              </p>
              <p>
                <strong>State:</strong> {info.state}
              </p>
              <p>
                <strong>ZIP Code:</strong> {info.zip_code}
              </p>
              <p>
                <strong>Country:</strong> {info.country}
              </p>
              <hr />
            </div>
          ))
        ) : (
          <p>No billing information available</p>
        )}
      </Card.Body>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>New Billing Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formCity">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formState">
              <Form.Label>State</Form.Label>
              <Form.Control
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formZipCode">
              <Form.Label>ZIP Code</Form.Label>
              <Form.Control
                type="text"
                name="zip_code"
                value={formData.zip_code}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formCountry">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Save
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Card>
  );
};

export default BillingInfo;
