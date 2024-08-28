import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";

import { RootState } from "../../state/store";
import Spinner from "../Spinner";
import { useLikePostMutation } from "../../state/slices/postsApiSlice";
import { toast } from "react-toastify";
import { useState } from "react";

interface CardFooterProps {
  postId: string;
  initialLikeCount: number;
  isLoading?: boolean;
  isPostLiked: boolean;
  commentCount: number;
}

const CardFooter: React.FC<CardFooterProps> = ({
  postId,
  initialLikeCount,
  isLoading,
  isPostLiked,
  commentCount,
}) => {
  const [likeCount, setLikeCount] = useState<number>(initialLikeCount);
  const [isLiked, setIsLiked] = useState<boolean>(isPostLiked);

  const { userInfo: user } = useSelector((state: RootState) => state.auth);

  const [likePost, { isLoading: isLikeLoading }] = useLikePostMutation();

  const handleLike = async () => {
    try {
      if (!user) {
        toast.error("Please login to like this post");
        return;
      }

      await likePost(postId).unwrap();

      if (isLiked) {
        setLikeCount((prev) => prev - 1);
      } else {
        setLikeCount((prev) => prev + 1);
      }

      setIsLiked(!isLiked);
    } catch (error: any) {
      toast.warn(error?.data?.message || "An error occurred");
    }
  };

  return (
    <Card.Footer className="d-flex align-items-center ps-0">
      {user && (
        <>
          <div className="d-flex align-items-center fs-5 ps-2">
            <Button
              className="pe-1"
              style={{
                backgroundColor: "transparent",
                borderColor: "transparent",
              }}
              onClick={handleLike}
              disabled={isLoading || isLikeLoading}
            >
              {isLoading || isLikeLoading ? (
                <Spinner />
              ) : (
                <i
                  className={`bi ${isLiked ? "bi-star-fill" : "bi-star"} h2`}
                  style={{
                    color: "#8c52ff",
                  }}
                />
              )}
            </Button>
            {likeCount > 0 && <p className="h-100 p-0 m-0 me-2">{likeCount}</p>}
          </div>

          <div className="d-flex align-items-center fs-5">
            <Button
              className="pe-1"
              style={{
                backgroundColor: "transparent",
                borderColor: "transparent",
              }}
            >
              <i
                className="bi bi-chat h2"
                style={{
                  color: "#8c52ff",
                }}
              ></i>
            </Button>
            {commentCount > 0 && (
              <p className="h-100 p-0 m-0 me-2">{commentCount}</p>
            )}
          </div>
        </>
      )}

      <Button
        style={{
          backgroundColor: "transparent",
          borderColor: "transparent",
        }}
      >
        <i
          className="bi bi-share h2"
          style={{
            color: "#8c52ff",
          }}
        ></i>
      </Button>
    </Card.Footer>
  );
};

export default CardFooter;