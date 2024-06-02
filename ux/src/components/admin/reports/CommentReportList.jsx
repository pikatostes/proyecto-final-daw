import React, { useState, useEffect } from "react";
import {
  Accordion,
  Card,
  Button,
  Col,
  Image,
  Row,
  Container,
} from "react-bootstrap";

const CommentReportsList = () => {
  const [commentReports, setCommentReports] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/comments/reports")
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Verifica el formato de los datos aquí
        setCommentReports(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Agrupar los reports por comment ID
  const groupedReports = commentReports.reduce((acc, report) => {
    if (!acc[report.comment_id]) {
      acc[report.comment_id] = [];
    }
    acc[report.comment_id].push(report);
    return acc;
  }, {});

  return (
    <div>
      <h1>Comment Reports</h1>
      <Accordion>
        {Object.keys(groupedReports).map((comment_id, idx) => {
          const firstReport = groupedReports[comment_id][0];
          return (
            <Accordion.Item eventKey={idx.toString()} key={comment_id}>
              <Accordion.Header>
                <Row className="align-items-center">
                  <Col xs={4}>
                    <Image
                      src={firstReport.comment_userAvatar}
                      fluid
                      roundedCircle
                      width={30}
                      alt={`Avatar of ${firstReport.comment_user}`}
                    />
                  </Col>
                  <Col xs={8}>
                    <Row className="d-flex justify-content-center">
                      <Col xs={12}>
                        <strong>{firstReport.comment_user}</strong>
                      </Col>
                      <Col xs={12}>{firstReport.comment_text}</Col>
                    </Row>
                  </Col>
                </Row>
              </Accordion.Header>
              <Accordion.Body>
                <Container>
                  {groupedReports[comment_id].map((report) => (
                    <Row
                      className="mb-3 d-flex align-items-center"
                      key={report.id}
                    >
                      <Col xs={3}>
                        <Image
                          src={report.user_avatar}
                          fluid
                          roundedCircle
                          width={50}
                          alt={`Avatar of ${report.user_name}`}
                        />
                      </Col>
                      <Col xs={9}>
                        <Row>
                          <Col xs={12}>
                            <strong>{report.user_name}</strong>
                          </Col>
                          <Col xs={12}>{report.description}</Col>
                        </Row>
                      </Col>
                    </Row>
                  ))}
                </Container>
              </Accordion.Body>
            </Accordion.Item>
          );
        })}
      </Accordion>
    </div>
  );
};

export default CommentReportsList;