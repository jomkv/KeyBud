import { Col } from "react-bootstrap";

import Card from "../post_card/Card";
import CardSkeleton from "../post_card/CardSkeleton";
import { IPost } from "../../@types/postType";
import NoResults from "../NoResults";

interface IPostsProps {
  isLoading: boolean;
  posts: IPost[];
}

const Posts: React.FC<IPostsProps> = ({ isLoading, posts }) => {
  const renderPosts = () => {
    if (isLoading) return null;

    if (!posts || posts.length === 0) {
      return (
        <Col xs={12} sm={12}>
          <NoResults />
        </Col>
      );
    }

    return posts?.map((post: IPost, index: number) => (
      <Col key={post._id} md={12} sm={12} className="mb-4">
        <Card key={post._id} post={post} imageHeight="25rem" />
      </Col>
    ));
  };

  return (
    <>
      {isLoading &&
        Array(4)
          .fill(0)
          .map((_, index) => (
            <Col key={index} md={12} sm={12} className="mb-4">
              <CardSkeleton />
            </Col>
          ))}
      {renderPosts()}
    </>
  );
};

export default Posts;
