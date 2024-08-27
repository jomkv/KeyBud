import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ListGroup from "react-bootstrap/ListGroup";

import { IComment } from "../../@types/commentType";
import formatDate from "../../utils/formatDate";

interface CommentProps {
  comment: IComment;
}

const CommentCard: React.FC<CommentProps> = ({ comment }) => {
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
            <p className="m-0 p-0 fs-5">
              {comment.ownerId.username} • {formatDate(comment.createdAt)}
            </p>
          </div>
        </Col>
        <Col>
          <p>{comment.comment}</p>
        </Col>
      </Row>
    </ListGroup.Item>
  );
};

export default CommentCard;
