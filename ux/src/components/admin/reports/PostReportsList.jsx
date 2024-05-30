import React, { useState, useEffect } from "react";
import { Accordion, Card, Button, Col, Image, Row } from "react-bootstrap";

const PostReportsList = () => {
  const [postReports, setPostReports] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/post/reports")
      .then((response) => response.json())
      .then((data) => setPostReports(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div>
      <h1>Post Reports</h1>
      <Accordion>
        {postReports.map((report, idx) => (
          <Accordion.Item eventKey={idx.toString()} key={report.id}>
            <Accordion.Header>
              <Row className="align-items-center">
                <Col xs={3}>
                  <Image
                    src={report.post_image}
                    fluid
                    thumbnail
                    width={500}
                    alt={`Thumbnail of ${report.post_title}`}
                  />
                </Col>
                <Col xs={9}>
                  <Row className="d-flex justify-content-center">
                    <Col xs={12}>
                      <strong>{report.post_title}</strong>
                    </Col>
                    <Col xs={12}>{report.post_user}</Col>
                  </Row>
                </Col>
              </Row>
            </Accordion.Header>
            <Accordion.Body>
              <Row className="d-flex align-items-center">
                <Col xs={2}>
                  <Image
                    src={report.user_avatar}
                    fluid
                    roundedCircle
                    width={50}
                    alt={`Avatar of ${report.user_name}`}
                  />
                </Col>
                <Col xs={10}>
                  <Row>
                    <Col xs={12}>
                      <strong>{report.user_name}</strong>
                    </Col>
                    <Col xs={12}>{report.description}</Col>
                  </Row>
                </Col>
              </Row>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
};

export default PostReportsList;
