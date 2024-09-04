// * Third Party Imports
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

// * Local Imports
import NavbarComponent from "../components/NavbarComponent";
import ChatWidget from "../components/ChatWidget";
import formatDate from "../utils/formatDate";
import { useGetPostQuery } from "../state/slices/postsApiSlice";
import { RootState } from "../state/store";
import Comments from "../components/post/Comments";
import definedOrRedirect from "../utils/definedOrRedirect";
import CardFooter from "../components/post_card/CardFooter";

function Post() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { userInfo: user } = useSelector((state: RootState) => state.auth);

  const [readableDate, setReadableDate] = useState<string>("");

  definedOrRedirect(id);

  const {
    data: post,
    isLoading: isPostLoading,
    isError: isPostError,
  } = useGetPostQuery(id);

  useEffect(() => {
    if (post) {
      setReadableDate(formatDate(post.createdAt));
    }
  }, [post]);

  useEffect(() => {
    if (isPostError) {
      navigate("/");
      toast.warn("Post not found");
    }
  }, [isPostError, navigate]);

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
              {post && (
                <CardFooter
                  postId={id}
                  initialLikeCount={post?.likeCount}
                  isPostLiked={post?.isLiked}
                  commentCount={post?.commentCount}
                />
              )}
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
