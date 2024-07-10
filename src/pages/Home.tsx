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
    <div className="bg-light w-100 h-100">
      <NavbarComponent />
      <Container
        className="mt-5"
        style={{
          backgroundColor: "aqua",
        }}
      >
        <Row>
          <Col lg={12}>
            <Card
              className="bg-secondary"
              style={{
                color: "white",
              }}
            >
              <Card.Header>Featured</Card.Header>
              <Card.Body className="text-center">
                <Card.Title>Special title treatment</Card.Title>
                <Card.Text>
                  With supporting text below as a natural lead-in to additional
                  content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
              <Card.Footer>2 days ago</Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
