// * Third Party Imports
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import { useEffect, useState } from "react";
import { redirect, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

// * Local Imports
import NavbarComponent from "../components/NavbarComponent";
import ChatWidget from "../components/ChatWidget";
import formatDate from "../utils/formatDate";
import { useGetPostQuery } from "../state/slices/postsApiSlice";
import { RootState } from "../state/store";
import Spinner from "../components/Spinner";
import { useLikePostMutation } from "../state/slices/postsApiSlice";
import Comments from "../components/post/Comments";

function definedOrRedirect(param: string | undefined): asserts param is string {
  if (param === undefined) {
    redirect("/");
  }
}

function Post() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { userInfo: user } = useSelector((state: RootState) => state.auth);

  const [readableDate, setReadableDate] = useState<string>("");
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(0);

  definedOrRedirect(id);

  const {
    data: post,
    isLoading: isPostLoading,
    isError: isPostError,
  } = useGetPostQuery(id);

  const [likePost, { isLoading: isLikeLoading }] = useLikePostMutation();

  useEffect(() => {
    if (post) {
      setReadableDate(formatDate(post.createdAt));
      setIsLiked(post.isLiked);
      setLikeCount(post.likeCount);
    }
  }, [post]);

  useEffect(() => {
    if (isPostError) {
      navigate("/");
    }
  }, [isPostError, navigate]);

  const handleLike = async () => {
    if (!post) {
      return;
    }

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
    <div className="bg-light">
      <NavbarComponent />

      <Container className="mb-3">
        <Row className="justify-content-center gy-4 mt-2">
          <Col md={11} sm={11}>
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
                      {post?.ownerId.username} • {readableDate}
                    </p>
                  </div>
                </div>
                <Card.Title className="fs-2 mt-3 p-2 pb-0">
                  {post?.title}
                </Card.Title>
              </Card.Header>

              <Card.Body className="pt-0 pb-0">
                <Card.Text className="p-2 pt-0">{post?.description}</Card.Text>
                {post?.images && post.images.length > 0 && (
                  <div className="d-flex justify-content-center">
                    <div className="w-50 d-flex justify-content-center">
                      <img
                        src={post?.images[0].url}
                        alt="content"
                        className="img-fluid m-0 p-0"
                      />
                    </div>
                  </div>
                )}
              </Card.Body>
              <Card.Footer
                className="d-flex align-items-center ps-0"
                style={{
                  borderBottom: "1px solid #dee2e6",
                }}
              >
                {user && (
                  <div className="d-flex align-items-center fs-5 ps-2">
                    <Button
                      className="pe-1"
                      style={{
                        backgroundColor: "transparent",
                        borderColor: "transparent",
                      }}
                      onClick={handleLike}
                      disabled={isPostLoading || isLikeLoading}
                    >
                      {isPostLoading || isLikeLoading ? (
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
                    {likeCount > 0 && !isPostLoading && (
                      <p className="h-100 p-0 m-0 me-2">{likeCount}</p>
                    )}
                  </div>
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
              <Comments postId={id} />
            </Card>
          </Col>
        </Row>
      </Container>

      {user && <ChatWidget />}
    </div>
  );
}

export default Post;
