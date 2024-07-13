import React, { Fragment, useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";

import NavbarComponent from "../components/NavbarComponent";
import CommentCard from "../components/post/CommentCard";

function Post() {
  return (
    <div className="bg-light">
      <NavbarComponent />

      <Container className="mb-3">
        <Row className="justify-content-center gy-4 mt-2">
          <Col md={11} sm={11}>
            <Card
              className="bg-secondary"
              style={{
                color: "white",
              }}
            >
              <Card.Header className="pt-3">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <img
                      src="images/user_icon.png"
                      alt="icon"
                      className="rounded-circle me-2"
                      style={{
                        height: "25px",
                      }}
                    />
                    <p className="m-0 p-0 fs-5">Username • 2 days ago</p>
                  </div>
                </div>
                <Card.Title className="fs-2 mt-3 p-2 pb-0">
                  Special title treatment
                </Card.Title>
              </Card.Header>

              <Card.Body className="pt-0 pb-0">
                <Card.Text className="p-2 pt-0">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Veniam omnis corporis ab, dolor maiores soluta dolorem,
                  nesciunt perferendis exercitationem ad nisi, molestias vitae
                  tenetur sint sequi natus. Sed, natus asperiores.
                </Card.Text>
                <div className="d-flex justify-content-center">
                  <div className="w-50">
                    <img
                      src="images/keyboard_sample_pic.jpg"
                      alt="content"
                      className="img-fluid m-0 p-0"
                    />
                  </div>
                </div>
              </Card.Body>
              <Card.Footer className="d-flex">
                <Button
                  style={{
                    backgroundColor: "transparent",
                    borderColor: "transparent",
                  }}
                >
                  <i
                    className="bi bi-star h2"
                    style={{
                      color: "#8c52ff",
                    }}
                  ></i>
                </Button>
                <Button
                  style={{
                    backgroundColor: "transparent",
                    borderColor: "transparent",
                  }}
                >
                  <i
                    className="bi bi-share h2"
                    style={{
                      color: "#8c52ff",
                    }}
                  ></i>
                </Button>
              </Card.Footer>
              <ListGroup className="list-group-flush">
                <ListGroup.Item className="bg-secondary pb-4">
                  <Form.Control
                    size="lg"
                    type="text"
                    placeholder="Add a comment"
                    style={{
                      borderRadius: "25px",
                    }}
                  />
                </ListGroup.Item>
                <CommentCard />
                <CommentCard />
                <CommentCard />
                <CommentCard />
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Post;
