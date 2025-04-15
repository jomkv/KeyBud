import { Button, OverlayTrigger, Popover } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

import { IPost } from "../../@types/postType";
import {
  useDeletePostMutation,
  usePinPostMutation,
} from "../../state/slices/postsApiSlice";

interface IOptionButtonProps {
  post: IPost;
}

const OptionButton: React.FC<IOptionButtonProps> = ({ post }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const [deletePost, { isLoading: isDeleteLoading }] = useDeletePostMutation();
  const [pinPost, { isLoading: isPinLoading }] = usePinPostMutation();

  useEffect(() => {
    if (isDeleteLoading || isPinLoading) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [isDeleteLoading, isPinLoading]);

  const handleEditClick = () => {
    navigate(`/edit-post/${post._id}`);
  };

  const handleDeleteClick = async () => {
    try {
      await deletePost(post._id).unwrap();
      toast.success("Post deleted successfully");
    } catch (error) {
      toast.warn("Something went wrong, please try again later");
    }
  };

  const handlePinClick = async () => {
    try {
      await pinPost(post._id).unwrap();
      toast.success(`Post ${post.isPinned ? "unpin" : "pin"} successful`);
    } catch (error) {
      toast.warn("Something went wrong, please try again later");
    }
  };

  const popover = (
    <Popover
      id="popover-basic"
      className="bg-secondary border border-light z-3 focus"
    >
      <Popover.Body>
        <button
          className="d-flex align-items-center"
          style={{
            backgroundColor: "transparent",
            border: "none",
            color: "white",
          }}
          onClick={handleEditClick}
          disabled={isLoading}
        >
          <i className="bi bi-pen me-2 fs-6" />
          <p className="p-0 m-0 fs-6">Edit</p>
        </button>
        <button
          className="d-flex align-items-center mt-2"
          style={{
            backgroundColor: "transparent",
            border: "none",
            color: "white",
          }}
          onClick={handlePinClick}
          disabled={isLoading}
        >
          <i className="bi bi-pin me-2 fs-6" />
          <p className="p-0 m-0 fs-6">{post.isPinned ? "Unpin" : "Pin"}</p>
        </button>
        <button
          className="d-flex align-items-center mt-2"
          style={{
            backgroundColor: "transparent",
            border: "none",
            color: "white",
          }}
          onClick={handleDeleteClick}
          disabled={isLoading}
        >
          <i className="bi bi-trash2 me-2 fs-6"></i>
          <p className="p-0 m-0 fs-6">Delete</p>
        </button>
      </Popover.Body>
    </Popover>
  );

  return (
    <OverlayTrigger
      trigger="click"
      placement="bottom"
      overlay={popover}
      rootClose
    >
      <Button
        className="m-0 p-0 fs-3"
        style={{
          color: "#8c52ff",
          backgroundColor: "transparent",
          border: "none",
        }}
      >
        <i className="bi bi-three-dots-vertical"></i>
      </Button>
    </OverlayTrigger>
  );
};

export default OptionButton;
