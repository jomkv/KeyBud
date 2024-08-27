import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import { IPost } from "../../@types/postType";
import formatDate from "../../utils/formatDate";
import { RootState } from "../../state/store";
import Spinner from "../Spinner";
import { useLikePostMutation } from "../../state/slices/postsApiSlice";

interface PostProps {
  post: IPost;
}

const PostCard: React.FC<PostProps> = ({ post }) => {
  const [isLiked, setIsLiked] = useState<boolean>(post.isLiked);
  const [likeCount, setLikeCount] = useState<number>(post.likeCount);

  const { userInfo: user } = useSelector((state: RootState) => state.auth);
  const [likePost, { isLoading }] = useLikePostMutation();

  const handleLike = async () => {
    try {
      if (!user) {
        toast.error("Please login to like this post");
        return;
      }

      await likePost(post._id).unwrap();

      if (isLiked) {
        setLikeCount((prev) => prev - 1);
      } else {
        setLikeCount((prev) => prev + 1);
      }

      setIsLiked(!isLiked);
    } catch (error: any) {
      toast.warn(error?.data?.message || "An error occurred");
    }
  };

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
          <Card.Footer className="d-flex align-items-center ps-0">
            {user && (
              <>
                <div className="d-flex align-items-center fs-5 ps-2">
                  <Button
                    className="pe-1"
                    style={{
                      backgroundColor: "transparent",
                      borderColor: "transparent",
                    }}
                    onClick={handleLike}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Spinner />
                    ) : (
                      <i
                        className={`bi ${
                          isLiked ? "bi-star-fill" : "bi-star"
                        } h2`}
                        style={{
                          color: "#8c52ff",
                        }}
                      />
                    )}
                  </Button>
                  {likeCount > 0 && (
                    <p className="h-100 p-0 m-0 me-2">{likeCount}</p>
                  )}
                </div>

                <div className="d-flex align-items-center fs-5">
                  <Button
                    className="pe-1"
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
                  {post.commentCount > 0 && (
                    <p className="h-100 p-0 m-0 me-2">{post.commentCount}</p>
                  )}
                </div>
              </>
            )}

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
