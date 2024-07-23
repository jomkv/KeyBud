// * 3rd Party Impoorts
import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";

// * Local Imports
import NavbarComponent from "../components/NavbarComponent";
import Build from "../components/profile/Build";
import Posts from "../components/profile/Posts";
import Likes from "../components/profile/Likes";
import ChatWidget from "../components/ChatWidget";

function Profile() {
  const [tab, setTab] = useState("build");

  return (
    <div className="bg-light">
      <NavbarComponent />

      <Container className="mb-3 mt-3">
        <Row>
          <Col xs={12} md={12} lg={5}>
            <div
              className="bg-secondary d-flex align-items-center p-4 rounded-3"
              style={{
                color: "white",
              }}
            >
              <div className="d-flex align-items-center">
                <img
                  src="images/user_icon.png"
                  className="rounded-circle me-3"
                  style={{
                    width: "5rem",
                  }}
                  alt="Icon"
                />
              </div>
              <Row xs={1} sm={1}>
                <Col>
                  <p className="fs-3 fw-bold m-0">Username</p>
                </Col>
                <Col>
                  <p className="fs-5">Tactile</p>
                </Col>
              </Row>
            </div>
          </Col>
          <Col xs={0} md={0} lg={2}></Col>
          <Col
            xs={12}
            md={12}
            lg={5}
            className="d-flex justify-content-center justify-content-lg-end align-items-end"
          >
            <Row xs={3} sm={3} className="mt-2">
              <Col>
                {tab === "build" ? (
                  <Button
                    className="fs-3 rounded-5 p-4 pt-2 pb-2 bg-secondary"
                    style={{
                      color: "white",
                      borderColor: "white",
                    }}
                    onClick={() => {
                      setTab("build");
                    }}
                  >
                    Build
                  </Button>
                ) : (
                  <Button
                    className="fs-3 rounded-5 p-4 pt-2 pb-2"
                    style={{
                      backgroundColor: "transparent",
                      borderColor: "transparent",
                    }}
                    onClick={() => {
                      setTab("build");
                    }}
                  >
                    Build
                  </Button>
                )}
              </Col>
              <Col>
                {tab === "posts" ? (
                  <Button
                    className="fs-3 rounded-5 p-4 pt-2 pb-2 bg-secondary"
                    style={{
                      color: "white",
                      borderColor: "white",
                    }}
                    onClick={() => {
                      setTab("posts");
                    }}
                  >
                    Posts
                  </Button>
                ) : (
                  <Button
                    className="fs-3 rounded-5 p-4 pt-2 pb-2"
                    style={{
                      backgroundColor: "transparent",
                      borderColor: "transparent",
                    }}
                    onClick={() => {
                      setTab("posts");
                    }}
                  >
                    Posts
                  </Button>
                )}
              </Col>
              <Col>
                {tab === "likes" ? (
                  <Button
                    className="fs-3 rounded-5 p-4 pt-2 pb-2 bg-secondary"
                    style={{
                      color: "white",
                      borderColor: "white",
                    }}
                    onClick={() => {
                      setTab("likes");
                    }}
                  >
                    Likes
                  </Button>
                ) : (
                  <Button
                    className="fs-3 rounded-5 p-4 pt-2 pb-2"
                    style={{
                      backgroundColor: "transparent",
                      borderColor: "transparent",
                    }}
                    onClick={() => {
                      setTab("likes");
                    }}
                  >
                    Likes
                  </Button>
                )}
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="justify-content-center mt-3">
          {tab === "build" && <Build />}
          {tab === "posts" && <Posts />}
          {tab === "likes" && <Likes />}
        </Row>
      </Container>

      <ChatWidget />
    </div>
  );
}

export default Profile;