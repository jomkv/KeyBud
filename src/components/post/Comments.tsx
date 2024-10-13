import { ListGroup } from "react-bootstrap";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

import CommentForm from "./CommentForm";
import CommentCard from "./CommentCard";
import { useGetPostCommentsQuery } from "../../state/slices/commentsApiSlice";
import { IComment } from "../../@types/commentType";
import { RootState } from "../../state/store";

interface CommentProps {
  postId: string;
  isComment: boolean;
}

const Comments: React.FC<CommentProps> = ({ postId, isComment }) => {
  const navigate = useNavigate();
  const { data: comments, isError } = useGetPostCommentsQuery(postId);
  const user = useSelector((state: RootState) => state.auth.userInfo);

  useEffect(() => {
    if (isError) {
      navigate("/");
      toast.error("An error occurred");
    }
  }, [isError, navigate]);

  return (
    <ListGroup className="list-group-flush">
      {user && <CommentForm isCommentInit={isComment} postId={postId} />}

      {comments?.map((comment: IComment, index: number) => (
        <CommentCard key={index} comment={comment} />
      ))}
    </ListGroup>
  );
};

export default Comments;
