import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ListGroup from "react-bootstrap/ListGroup";

function CommentCard() {
  return (
    <ListGroup.Item className="bg-secondary">
      <Row
        sm={1}
        md={1}
        style={{
          color: "white",
        }}
        className="p-3 gy-3"
      >
        <Col className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <img
              src="/images/user_icon.png"
              alt="icon"
              className="rounded-circle me-2"
              style={{
                height: "25px",
              }}
            />
            <p className="m-0 p-0 fs-5">Username • 2 days ago</p>
          </div>
        </Col>
        <Col>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veniam
            omnis corporis ab, dolor maiores soluta dolorem, nesciunt
            perferendis exercitationem ad nisi, molestias vitae tenetur sint
            sequi natus. Sed, natus asperiores.
          </p>
        </Col>
      </Row>
    </ListGroup.Item>
  );
}

export default CommentCard;
