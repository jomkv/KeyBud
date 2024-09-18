import { ListGroup } from "react-bootstrap";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import CommentForm from "./CommentForm";
import CommentCard from "./CommentCard";
import { useGetPostCommentsQuery } from "../../state/slices/commentsApiSlice";
import { IComment } from "../../@types/commentType";

interface CommentProps {
  postId: string;
  isComment: boolean;
}

const Comments: React.FC<CommentProps> = ({ postId, isComment }) => {
  const navigate = useNavigate();
  const { data: comments, isError } = useGetPostCommentsQuery(postId);

  useEffect(() => {
    if (isError) {
      navigate("/");
      toast.error("An error occurred");
    }
  }, [isError, navigate]);

  return (
    <ListGroup className="list-group-flush">
      <CommentForm isCommentInit={isComment} postId={postId} />

      {comments?.map((comment: IComment, index: number) => (
        <CommentCard key={index} comment={comment} />
      ))}
    </ListGroup>
  );
};

export default Comments;
