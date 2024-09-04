import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import formatDate from "../../utils/formatDate";
import { IPost } from "../../@types/postType";
import { RootState } from "../../state/store";

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
            {post.ownerId.username} • {formatDate(post.createdAt)}
          </p>
        </div>
        {user && user.id === post.ownerId._id && (
          <Button
            className="m-0 p-0 fs-3"
            style={{
              color: "#8c52ff",
              backgroundColor: "transparent",
              border: "none",
            }}
          >
            <i className="bi bi-three-dots-vertical"></i>
          </Button>
        )}
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
