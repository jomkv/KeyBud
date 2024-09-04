import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { IPost } from "../../@types/postType";
import Card from "../post_card/Card";

interface PostProps {
  post: IPost;
}

const PostCard: React.FC<PostProps> = ({ post }) => {
  return (
    <Row className="justify-content-center gy-4 mt-1">
      <Col lg={6} md={9} sm={11}>
        <Card post={post} />
      </Col>
    </Row>
  );
};

export default PostCard;
