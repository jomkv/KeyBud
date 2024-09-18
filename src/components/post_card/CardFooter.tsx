import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { RootState } from "../../state/store";
import Spinner from "../Spinner";
import { useLikePostMutation } from "../../state/slices/postsApiSlice";

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
  const [isCommentHover, setIsCommentHover] = useState<boolean>(false);
  const [isShareHover, setIsShareHover] = useState<boolean>(false);

  const navigate = useNavigate();

  const { userInfo: user } = useSelector((state: RootState) => state.auth);

  const [likePost, { isLoading: isLikeLoading }] = useLikePostMutation();

  const handleShare = () => {
    navigator.clipboard.writeText(`${window.location.origin}/post/${postId}`);
    toast.info("Link copied to clipboard");
  };

  const handleComment = () => {
    navigate(`/post/${postId}?comment=true`);
  };

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
              onMouseOver={() => setIsCommentHover(true)}
              onMouseLeave={() => setIsCommentHover(false)}
              onClick={handleComment}
            >
              <i
                className={`bi bi-chat${isCommentHover ? "-fill" : ""} h2`}
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
        onMouseOver={() => setIsShareHover(true)}
        onMouseLeave={() => setIsShareHover(false)}
        onClick={handleShare}
      >
        <i
          className={`bi bi-share${isShareHover ? "-fill" : ""} h2`}
          style={{
            color: "#8c52ff",
          }}
        ></i>
      </Button>
    </Card.Footer>
  );
};

export default CardFooter;
