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
import { IUserState } from "../@types/userType";

function Home() {
  const { user }: IUserState = useSelector((state: RootState) => state.user);
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
        {posts.map((post: IPost, index: number) => (
          <PostCard key={index} post={post} />
        ))}
      </Container>
      {user && <ChatWidget />}
      {user && <CreatePostWidget />}
    </div>
  );
}

export default Home;
