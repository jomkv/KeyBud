// * Third Party Imports
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import queryString from "query-string";

// * Local Imports
import NavbarComponent from "../components/NavbarComponent";
import { useGetPostQuery } from "../state/slices/postsApiSlice";
import definedOrRedirect from "../utils/definedOrRedirect";
import Card from "../components/post_card/Card";
import CardSkeleton from "../components/post_card/CardSkeleton";

function Post() {
  const [isComment, setIsComment] = useState<boolean>(false);

  const { id } = useParams();
  const navigate = useNavigate();

  definedOrRedirect(id);

  const {
    data: post,
    isLoading: isPostLoading,
    isError: isPostError,
  } = useGetPostQuery(id);

  useEffect(() => {
    const isComment = queryString.parse(window.location.search).comment;

    if (isComment && isComment === "true") {
      setIsComment(true);
    }
  }, []);

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
              <CardSkeleton isPostPage={true} />
            ) : (
              post && (
                <Card post={post} isPostPage={true} isComment={isComment} />
              )
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Post;
