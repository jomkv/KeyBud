import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

import { IPost } from "../../@types/postType";
import formatDate from "../../utils/formatDate";
import CardFooter from "../post_card/CardFooter";

interface IPostCardProps {
  post: IPost;
}

const ProfilePostCard: React.FC<IPostCardProps> = ({ post }) => {
  return (
    <Col md={12} sm={12} className="mb-4">
      <Card
        className="bg-secondary"
        style={{
          color: "white",
        }}
      >
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
          </div>
          <Card.Title className="fs-2 mt-3 p-2 pb-0">{post.title}</Card.Title>
        </Card.Header>

        <Card.Body className="pt-0 pb-0">
          <Card.Text className="p-2 pt-0">{post.description}</Card.Text>
          {post.images && post.images.length > 0 && (
            <div className="d-flex justify-content-center">
              <div className="w-50">
                <img
                  src={post.images[0].url}
                  alt="content"
                  className="img-fluid m-0 p-0"
                />
              </div>
            </div>
          )}
        </Card.Body>
        <CardFooter
          postId={post._id}
          initialLikeCount={post.likeCount}
          isPostLiked={post.isLiked}
          commentCount={post.commentCount}
        />
      </Card>
    </Col>
  );
};

export default ProfilePostCard;
