import { Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";

import Card from "../post_card/Card";
import { useGetUserPostsQuery } from "../../state/slices/usersApiSlice";
import CardSkeleton from "../post_card/CardSkeleton";

interface IPostsProps {
  userId: string;
}

const Posts: React.FC<IPostsProps> = ({ userId }) => {
  const { data: userPosts, isLoading, isError } = useGetUserPostsQuery(userId);
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
            <Col md={12} sm={12} className="mb-4">
              <CardSkeleton />
            </Col>
          ))}
      {userPosts &&
        userPosts.map((post) => (
          <Col md={12} sm={12} className="mb-4">
            <Card key={post._id} post={post} />
          </Col>
        ))}
    </>
  );
};

export default Posts;
