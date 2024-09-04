import { Col } from "react-bootstrap";
import { IPost } from "../../@types/postType";
import Card from "../post_card/Card";

interface IPostsProps {
  posts: IPost[];
}

const Posts: React.FC<IPostsProps> = ({ posts }) => {
  return (
    <>
      {posts.map((post) => (
        <Col md={12} sm={12} className="mb-4">
          <Card key={post._id} post={post} />
        </Col>
      ))}
    </>
  );
};

export default Posts;
