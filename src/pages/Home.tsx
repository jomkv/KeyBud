import NavbarComponent from "../components/NavbarComponent";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Fragment } from "react";

interface IPosts {
  _id: string;
  title: string;
  description: string;
  likeCount: number;
  comments: string[];
  ownerId: {
    _id: string;
    username: string;
  };
  isEditted: boolean;
}

function Home() {
  return (
    <div className="bg-light">
      <NavbarComponent />
      <Container className="mb-3">
        <Row className="justify-content-center gy-4 mt-2">
          <Col lg={6} md={9} sm={11}>
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
                    <p className="m-0 p-0 fs-5">Username</p>
                  </div>
                  <p className="m-0 p-0 fs-6">2 days ago</p>
                </div>
                <Card.Title className="text-center">
                  Special title treatment
                </Card.Title>
              </Card.Header>
              <Card.Body className="pt-0 pb-0">
                <Card.Text>
                  <img
                    src="images/keyboard_sample_pic.jpg"
                    alt="content"
                    className="img-fluid m-0 p-0"
                  />
                </Card.Text>
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
                    className="bi bi-chat h2"
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
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
