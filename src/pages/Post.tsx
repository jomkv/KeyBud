// * Third Party Imports
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

// * Local Imports
import NavbarComponent from "../components/NavbarComponent";
import ChatWidget from "../components/ChatWidget";
import { useGetPostQuery } from "../state/slices/postsApiSlice";
import { RootState } from "../state/store";
import definedOrRedirect from "../utils/definedOrRedirect";
import Card from "../components/post_card/Card";

function Post() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { userInfo: user } = useSelector((state: RootState) => state.auth);

  definedOrRedirect(id);

  const {
    data: post,
    isLoading: isPostLoading,
    isError: isPostError,
  } = useGetPostQuery(id);

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
            {isPostLoading ? (
              <h1>Loading...</h1>
            ) : (
              post && <Card post={post} isPostPage={true} />
            )}
          </Col>
        </Row>
      </Container>

      {user && <ChatWidget />}
    </div>
  );
}

export default Post;
