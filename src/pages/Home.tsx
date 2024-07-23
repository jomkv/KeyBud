import NavbarComponent from "../components/NavbarComponent";
import ChatWidget from "../components/ChatWidget";
import PostCard from "../components/home/PostCard";
import CreatePostButton from "../components/home/CreatePostButton";

import Container from "react-bootstrap/Container";

interface IPosts {
  _id: string;
  title: string;
  description: string;
  likeCount: number;
  comments: string[];
  ownerId: {
    _id: string;
    username: string;
  };
  isEditted: boolean;
}

function Home() {
  return (
    <div className="bg-light">
      <NavbarComponent />
      <Container className="mb-3 d-flex flex-column">
        <CreatePostButton />
        <PostCard />
        <PostCard />
      </Container>
      <ChatWidget />
    </div>
  );
}

export default Home;
