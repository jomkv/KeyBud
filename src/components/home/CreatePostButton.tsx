import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function CreatePostButton() {
  return (
    <Row className="justify-content-center mt-4">
      <Col lg={6} md={9} sm={11}>
        <Link
          to="/create-post"
          className="btn btn-primary fs-3 w-100 fw-bold"
          style={{
            color: "white",
          }}
        >
          Post
        </Link>
      </Col>
    </Row>
  );
}

export default CreatePostButton;
