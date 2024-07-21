import NavbarComponent from "../components/NavbarComponent";
import ChatWidget from "../components/ChatWidget";
import PostCard from "../components/home/PostCard";

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
      <Container className="mb-3">
        <PostCard />
        <PostCard />
      </Container>
      <ChatWidget />
    </div>
  );
}

export default Home;
