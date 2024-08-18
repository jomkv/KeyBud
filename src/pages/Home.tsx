import NavbarComponent from "../components/NavbarComponent";
import ChatWidget from "../components/ChatWidget";
import PostCard from "../components/home/PostCard";
import CreatePostWidget from "../components/CreatePostWidget";
import { AppDispatch, RootState } from "../state/store";
import { useDispatch, useSelector } from "react-redux";
import { IPost, IPostState } from "../@types/postType";

import Container from "react-bootstrap/Container";
import { useEffect } from "react";
import { getAllPostsAsync } from "../state/post/postSlice";

function Home() {
  const { posts, isLoading }: IPostState = useSelector(
    (state: RootState) => state.post
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getAllPostsAsync(null));
  }, []);

  return (
    <div className="bg-light">
      <NavbarComponent />
      <Container className="mb-3 d-flex flex-column">
        {posts.map((post: IPost) => (
          <PostCard
            username={post.ownerId.username}
            title={post.title}
            imageUrl={post.images[0].url}
          />
        ))}
      </Container>
      <ChatWidget />
      <CreatePostWidget />
    </div>
  );
}

export default Home;
