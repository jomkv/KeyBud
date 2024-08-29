import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

import { IPost } from "../../@types/postType";
import formatDate from "../../utils/formatDate";
import CardFooter from "../post_card/CardFooter";

interface PostProps {
  post: IPost;
}

const PostCard: React.FC<PostProps> = ({ post }) => {
  return (
    <Row className="justify-content-center gy-4 mt-1">
      <Col lg={6} md={9} sm={11}>
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
                  src="images/user_icon.png"
                  alt="icon"
                  className="rounded-circle me-2"
                  style={{
                    height: "25px",
                  }}
                />
                <p className="m-0 p-0 fs-5">{post.ownerId.username}</p>
              </div>
              <p className="m-0 p-0 fs-6">{formatDate(post.createdAt)}</p>
            </div>
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
          </Card.Header>
          <Card.Body className="pt-0 pb-0">
            {post.images && post.images.length > 0 && (
              <div className="d-flex justify-content-center">
                <img
                  src={post.images[0].url}
                  alt="content"
                  className="img-fluid m-0 p-0"
                />
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
    </Row>
  );
};

export default PostCard;
