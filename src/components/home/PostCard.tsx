import React, { Fragment, useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import { IPost } from "../../@types/postType";

interface PostProps {
  // post: IPosts;
}

const PostCard: React.FC<PostProps> = () => {
  const [redirectLink, setRedirectLink] = useState<string>("");
  const [likeCount, setLikeCount] = useState<number>(0);
  const [commentCount, setCommentCount] = useState<number>(2);
  const [isLiked, setIsLiked] = useState<boolean>(false);

  // const handleLikeClick = () => {
  //   setIsLiked(!isLiked);
  // };

  useEffect(() => {
    // const postId = post._id;
    // const link = `http://localhost:3000/${postId}`;
    // setRedirectLink(link);
  }, []);

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
                <p className="m-0 p-0 fs-5">Username</p>
              </div>
              <p className="m-0 p-0 fs-6">2 days ago</p>
            </div>
            <Card.Title className="fs-2 mt-2">
              Special title treatment
            </Card.Title>
          </Card.Header>
          <a
            href="/post"
            style={{
              textDecoration: "none",
            }}
          >
            <Card.Body className="pt-0 pb-0">
              <Card.Text>
                <img
                  src="images/keyboard_sample_pic.jpg"
                  alt="content"
                  className="img-fluid m-0 p-0"
                />
              </Card.Text>
            </Card.Body>
          </a>
          <Card.Footer className="d-flex">
            <Button
              style={{
                backgroundColor: "transparent",
                borderColor: "transparent",
              }}
            >
              <i
                className="bi bi-star h2"
                style={{
                  color: "#8c52ff",
                }}
              ></i>
            </Button>
            <Button
              style={{
                backgroundColor: "transparent",
                borderColor: "transparent",
              }}
            >
              <i
                className="bi bi-chat h2"
                style={{
                  color: "#8c52ff",
                }}
              ></i>
            </Button>
            <Button
              style={{
                backgroundColor: "transparent",
                borderColor: "transparent",
              }}
            >
              <i
                className="bi bi-share h2"
                style={{
                  color: "#8c52ff",
                }}
              ></i>
            </Button>
          </Card.Footer>
        </Card>
      </Col>
    </Row>
  );
};

export default PostCard;
