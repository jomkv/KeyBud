import NavbarComponent from "../components/NavbarComponent";
import PostCard from "../components/home/PostCard";
import CreatePostWidget from "../components/CreatePostWidget";
import { IPost } from "../@types/postType";
import { useGetPostsQuery } from "../state/slices/postsApiSlice";
import CardSkeleton from "../components/post_card/CardSkeleton";
import Container from "react-bootstrap/Container";
import { Col, Row } from "react-bootstrap";
import { useUserContext } from "../context/UserContext";
import NoResults from "../components/NoResults";

function Home() {
  const { user } = useUserContext();

  const { data: posts, isLoading } = useGetPostsQuery();

  const renderPosts = () => {
    if (isLoading) return null;

    if (!posts || posts.length === 0) {
      return (
        <Row className="justify-content-center gy-4 mt-1">
          <Col xs={12} sm={12}>
            <NoResults />
          </Col>
        </Row>
      );
    }

    return posts?.map((post: IPost, index: number) => (
      <PostCard key={index} post={post} />
    ));
  };

  return (
    <div className="bg-light">
      <NavbarComponent />
      <Container className="mb-3 d-flex flex-column">
        {isLoading &&
          Array(4)
            .fill(0)
            .map((_, index) => (
              <Row className="justify-content-center gy-4 mt-1" key={index}>
                <Col md={12} sm={12}>
                  <CardSkeleton />
                </Col>
              </Row>
            ))}
        {renderPosts()}
      </Container>
      {user && <CreatePostWidget />}
    </div>
  );
}

export default Home;
