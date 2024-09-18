import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import formatDate from "../../utils/formatDate";
import { IPost } from "../../@types/postType";
import { RootState } from "../../state/store";
import OptionButton from "./OptionButton";

interface ICardHeaderProps {
  post: IPost;
  isPostPage?: boolean;
}

const CardHeader: React.FC<ICardHeaderProps> = ({ post, isPostPage }) => {
  const { userInfo: user } = useSelector((state: RootState) => state.auth);

  return (
    <Card.Header className="pt-3">
      <div className="d-flex align-items-center justify-content-between">
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
            <Link
              to={`/profile/${post.ownerId._id}`}
              className="card_header_username"
              style={{
                cursor: "pointer",
                color: "white",
                textDecoration: "none",
              }}
            >
              {post.ownerId.username}
            </Link>{" "}
            • {formatDate(post.createdAt)} {post.isPinned ? "📌" : ""}
          </p>
        </div>
        {user && user.id === post.ownerId._id && <OptionButton post={post} />}
      </div>
      {isPostPage ? (
        <Card.Title
          className="fs-2 mt-3 p-2 pb-0"
          style={{
            color: "white",
          }}
        >
          {post.title}
        </Card.Title>
      ) : (
        <Link
          to={`/post/${post._id}`}
          style={{
            textDecoration: "none",
          }}
        >
          <Card.Title
            className="fs-2 mt-2"
            style={{
              color: "white",
            }}
          >
            {post.title}
          </Card.Title>
        </Link>
      )}
    </Card.Header>
  );
};

export default CardHeader;
