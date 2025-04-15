import { Button, OverlayTrigger, Popover } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useDeleteCommentMutation } from "../../state/slices/commentsApiSlice";
import { IComment } from "../../@types/commentType";

interface IOptionButtonProps {
  comment: IComment;
}

const CommentOption: React.FC<IOptionButtonProps> = ({ comment }) => {
  const [deleteComment, { isLoading }] = useDeleteCommentMutation();
  const navigate = useNavigate();

  const handleDeleteClick = async () => {
    try {
      await deleteComment(comment._id).unwrap();
      navigate(0); // refresh
      toast.success("Comment deleted successfully.");
    } catch (error) {
      toast.warn("Failed to delete comment, please try again later.");
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
        <i className="bi bi-three-dots-vertical" />
      </Button>
    </OverlayTrigger>
  );
};

export default CommentOption;
