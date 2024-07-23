import { Container, Col, Row } from "react-bootstrap";
import { useState } from "react";

function ChatWidget() {
  const [show, setShow] = useState<boolean>(false);

  const handleClick = () => {
    setShow(!show);
  };

  return (
    <div
      className="bg-secondary pb-2 p-3 rounded-top-4 shadow-lg position-absolute bottom-0"
      style={{
        color: "white",
        width: show ? "25rem" : "16rem",
        right: "20px",
      }}
    >
      <Container fluid>
        <div
          role="button"
          onClick={handleClick}
          className="d-flex justify-content-between align-items-center w-100"
        >
          <p className="fs-5 mb-0">Messages</p>
          <i className="bi bi-chevron-double-up fs-5"></i>
        </div>
        {show && (
          <>
            <Row className="w-100 mt-3">
              <Col xs={12} sm={12}>
                <div className="d-flex align-items-center h-100">
                  <img
                    src="images/user_icon.png"
                    alt="icon"
                    className="rounded-circle me-2 h-75"
                  />
                  <div>
                    <p className="m-0 p-0 fs-5 fw-bold">Username</p>
                    <p className="m-0 p-0 fw-light">
                      Lorem ipsum dolor sit amet consectetur, adipisicing .....
                    </p>
                  </div>
                </div>
              </Col>
            </Row>
            <Row className="w-100 mt-3">
              <Col xs={12} sm={12}>
                <div className="d-flex align-items-center h-100">
                  <img
                    src="images/user_icon.png"
                    alt="icon"
                    className="rounded-circle me-2 h-75"
                  />
                  <div>
                    <p className="m-0 p-0 fs-5 fw-bold">Username</p>
                    <p className="m-0 p-0 fw-light">
                      Lorem ipsum dolor sit amet consectetur, adipisicing .....
                    </p>
                  </div>
                </div>
              </Col>
            </Row>
            <Row className="w-100 mt-3">
              <Col xs={12} sm={12}>
                <div className="d-flex align-items-center h-100">
                  <img
                    src="images/user_icon.png"
                    alt="icon"
                    className="rounded-circle me-2 h-75"
                  />
                  <div>
                    <p className="m-0 p-0 fs-5 fw-bold">Username</p>
                    <p className="m-0 p-0 fw-light">
                      Lorem ipsum dolor sit amet consectetur, adipisicing .....
                    </p>
                  </div>
                </div>
              </Col>
            </Row>
          </>
        )}
      </Container>
    </div>
  );
}

export default ChatWidget;
