import { Col } from "react-bootstrap";

import Card from "../post_card/Card";
import CardSkeleton from "../post_card/CardSkeleton";
import NoResults from "../NoResults";
import { IPost } from "../../@types/postType";

interface IPostsProps {
  isLoading: boolean;
  likes: IPost[];
}

const Likes: React.FC<IPostsProps> = ({ isLoading, likes }) => {
  const renderLikedPosts = () => {
    if (isLoading) return null;

    if (!likes || likes.length === 0) {
      return (
        <Col xs={12} sm={12}>
          <NoResults />
        </Col>
      );
    }

    return likes?.map((post: IPost, index: number) => (
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
      {renderLikedPosts()}
    </>
  );
};

export default Likes;
