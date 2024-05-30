import React, { useState, useEffect } from "react";
import { Card, Spinner } from "react-bootstrap";
import { fetchUserBillingInfo } from "./profileUtil";

const BillingInfo = () => {
  const [userBillingInfo, setUserBillingInfo] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <Card>
      <Card.Header>Billing Info</Card.Header>
      <Card.Body>
        {loading ? (
          <Spinner animation="border" />
        ) : userBillingInfo.length > 0 ? (
          userBillingInfo.map((info, index) => (
            <div key={index}>
              <p><strong>Address:</strong> {info.address}</p>
              <p><strong>City:</strong> {info.city}</p>
              <p><strong>State:</strong> {info.state}</p>
              <p><strong>ZIP Code:</strong> {info.zip_code}</p>
              <p><strong>Country:</strong> {info.country}</p>
              <hr />
            </div>
          ))
        ) : (
          <p>No billing information available</p>
        )}
      </Card.Body>
    </Card>
  );
};

export default BillingInfo;
