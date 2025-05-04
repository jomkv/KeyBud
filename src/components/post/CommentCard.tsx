import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";

import { IComment } from "../../@types/commentType";
import formatDate from "../../utils/dateHelpers";
import CommentOption from "./CommentOption";
import { useUserContext } from "../../context/UserContext";

interface CommentProps {
  comment: IComment;
}

const CommentCard: React.FC<CommentProps> = ({ comment }) => {
  const { user } = useUserContext();

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
        <Col
          className="d-flex align-items-center justify-content-between"
          xs={12}
          sm={12}
        >
          <div className="d-flex align-items-center">
            <img
              src={comment.ownerId.icon || "/images/user_icon.png"}
              alt="icon"
              className="rounded-circle me-3"
              style={{
                height: "1.7rem",
                width: "1.7rem",
                objectFit: "cover",
              }}
            />
            <p className="m-0 p-0 fs-5">
              <Link
                to={`/profile/${comment.ownerId._id}`}
                className="card_header_username"
                style={{
                  cursor: "pointer",
                  color: "white",
                  textDecoration: "none",
                }}
              >
                {comment.ownerId.username}
              </Link>{" "}
              • {formatDate(comment.createdAt)}
            </p>
          </div>
          {user && user._id && user._id === comment.ownerId._id && (
            <CommentOption comment={comment} />
          )}
        </Col>
        <Col xs={12} sm={12}>
          <p>{comment.comment}</p>
        </Col>
      </Row>
    </ListGroup.Item>
  );
};

export default CommentCard;
