import NavbarComponent from "../components/NavbarComponent";
import PostCard from "../components/home/PostCard";
import CreatePostWidget from "../components/CreatePostWidget";
import { RootState } from "../state/store";
import { useSelector } from "react-redux";
import { IPost } from "../@types/postType";

import Container from "react-bootstrap/Container";
import { useGetPostsQuery } from "../state/slices/postsApiSlice";

function Home() {
  const { userInfo: user } = useSelector((state: RootState) => state.auth);

  const { data: posts } = useGetPostsQuery();

  return (
    <div className="bg-light">
      <NavbarComponent />
      <Container className="mb-3 d-flex flex-column">
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
