import { Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";

import Card from "../post_card/Card";
import { useGetUserLikesQuery } from "../../state/slices/usersApiSlice";
import CardSkeleton from "../post_card/CardSkeleton";
import NoResults from "../NoResults";

interface IPostsProps {
  userId: string;
}

const Likes: React.FC<IPostsProps> = ({ userId }) => {
  const {
    data: likedPosts,
    isLoading,
    isError,
    isSuccess,
  } = useGetUserLikesQuery(userId);
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      navigate("/");
      toast.warn("User not found");
    }
  }, [isError, navigate]);

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
      {isSuccess && likedPosts && likedPosts.length === 0 && (
        <Col xs={12} sm={12}>
          <NoResults />
        </Col>
      )}
      {likedPosts &&
        likedPosts.map((post) => (
          <Col key={post._id} md={12} sm={12} className="mb-4">
            <Card key={post._id} post={post} imageHeight="25rem" />
          </Col>
        ))}
    </>
  );
};

export default Likes;
