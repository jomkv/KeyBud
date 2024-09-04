import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

import { IPost } from "../../@types/postType";
import CardFooter from "../post_card/CardFooter";
import CardHeader from "../post_card/CardHeader";

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
          <CardHeader post={post} />
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
