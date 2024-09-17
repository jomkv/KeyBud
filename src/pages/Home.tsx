import NavbarComponent from "../components/NavbarComponent";
import PostCard from "../components/home/PostCard";
import CreatePostWidget from "../components/CreatePostWidget";
import { RootState } from "../state/store";
import { useSelector } from "react-redux";
import { IPost } from "../@types/postType";
import { useGetPostsQuery } from "../state/slices/postsApiSlice";
import CardSkeleton from "../components/post_card/CardSkeleton";

import Container from "react-bootstrap/Container";
import { Col, Row } from "react-bootstrap";

function Home() {
  const { userInfo: user } = useSelector((state: RootState) => state.auth);

  const { data: posts, isLoading } = useGetPostsQuery();

  return (
    <div className="bg-light">
      <NavbarComponent />
      <Container className="mb-3 d-flex flex-column">
        {isLoading &&
          Array(4)
            .fill(0)
            .map((_, index) => (
              <Row className="justify-content-center gy-4 mt-1" key={index}>
                <Col lg={6} md={9} sm={11}>
                  <CardSkeleton />
                </Col>
              </Row>
            ))}
        {posts &&
          posts.length !== 0 &&
          posts.map((post: IPost, index: number) => (
            <PostCard key={index} post={post} />
          ))}
      </Container>
      {user && <CreatePostWidget />}
    </div>
  );
}

export default Home;
