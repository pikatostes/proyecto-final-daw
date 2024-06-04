import React, { useState, useEffect } from "react";
import { Accordion, Col, Image, Row } from "react-bootstrap";

const PostReportsList = () => {
  const [postReports, setPostReports] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/post/reports")
      .then((response) => response.json())
      .then((data) => setPostReports(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Improvement: Group reports by post ID outside of the render function
  const groupedReports = React.useMemo(() => {
    return postReports.reduce((acc, report) => {
      if (!acc[report.post_id]) {
        acc[report.post_id] = [];
      }
      acc[report.post_id].push(report);
      return acc;
    }, {});
  }, [postReports]);

  return (
    <div>
      <h1>Post Reports</h1>
      <Accordion>
        {Object.entries(groupedReports).map(([postId, reports]) => (
          <Accordion.Item eventKey={postId} key={postId}>
            <Accordion.Header>
              <Row className="align-items-center">
                <Col xs={3}>
                  <Image
                    src={reports[0].post_image} // Use first report's image for post preview
                    fluid
                    thumbnail
                    width={500}
                    alt={`Thumbnail of ${reports[0].post_title}`}
                  />
                </Col>
                <Col xs={9}>
                  <Row className="d-flex justify-content-center">
                    <Col xs={12}>
                      <strong>{reports[0].post_title}</strong>
                    </Col>
                    <Col xs={12}>{reports[0].post_user}</Col>
                  </Row>
                </Col>
              </Row>
            </Accordion.Header>
            <Accordion.Body>
              {reports.map((report) => (
                <Row key={report.id} className="d-flex align-items-center">
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
              ))}
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
};

export default PostReportsList;
