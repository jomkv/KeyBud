import { Row, Col } from "react-bootstrap";

function ConversationOption() {
  return (
    <Row className="gx-0 chat-container">
      <Col xs={2} sm={2}>
        <img
          src="images/user_icon.png"
          alt="icon"
          className="rounded-circle me-0 p-2"
          style={{
            objectFit: "cover",
            width: "80px",
            height: "80px",
          }}
        />
      </Col>
      <Col
        xs={10}
        sm={10}
        className="ps-2 d-flex flex-column justify-content-center"
      >
        <p className="m-0 p-0 fs-5 fw-bold">Username</p>
        <p className="m-0 p-0 fw-light">Lorem ipsum dolor sit ame.....</p>
      </Col>
    </Row>
  );
}

export default ConversationOption;
