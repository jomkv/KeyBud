import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function CreatePostButton() {
  return (
    <Row className="justify-content-center mt-4">
      <Col lg={6} md={9} sm={11}>
        <a
          className="btn btn-primary fs-3 w-100 fw-bold"
          href="/create-post"
          style={{
            color: "white",
          }}
        >
          Post
        </a>
      </Col>
    </Row>
  );
}

export default CreatePostButton;
