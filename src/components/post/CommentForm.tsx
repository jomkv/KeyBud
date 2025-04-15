import Button from "react-bootstrap/Button";
import { Form } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { useCreateCommentMutation } from "../../state/slices/commentsApiSlice";
import { ICommentInput } from "../../@types/commentType";
import Spinner from "../Spinner";

const schema = z.object({
  comment: z.string().nonempty("Comment cannot be empty"),
});

interface IForm {
  comment: string;
}

interface CommentFormProps {
  postId: string;
  isCommentInit: boolean;
}

const CommentForm: React.FC<CommentFormProps> = ({ postId, isCommentInit }) => {
  const [isComment, setIsComment] = useState<boolean>(isCommentInit);

  const navigate = useNavigate();
  const [createComment, { isLoading }] = useCreateCommentMutation();

  const form = useForm<IForm>({
    defaultValues: {
      comment: "",
    },
    resolver: zodResolver(schema),
  });

  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const onSubmit = async (formData: IForm) => {
    const data: ICommentInput = {
      comment: formData.comment,
      repliesTo: postId,
    };

    try {
      await createComment(data).unwrap();
      navigate(0); // reload page
    } catch (error: any) {
      toast.warn(
        error?.data?.message ||
          "Failed to send comment, please try again later."
      );
    }
  };

  return (
    <ListGroup.Item className="bg-secondary pb-4">
      {isComment ? (
        <Form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Form.Group className="mb-3">
            <Form.Control
              size="lg"
              as="textarea"
              rows={2}
              placeholder="Write your comment"
              id="comment"
              {...register("comment")}
              isInvalid={errors.comment?.message ? true : false}
              autoFocus
            />
            <Form.Control.Feedback type="invalid">
              {errors.comment?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <div className="w-100 d-flex justify-content-end">
            <Button
              className="mt-3 ml-auto fs-6 fw-semibold"
              style={{ color: "white" }}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? <Spinner /> : "Comment"}
            </Button>
          </div>
        </Form>
      ) : (
        <Form.Control
          size="lg"
          type="text"
          placeholder="Add a comment"
          style={{
            borderRadius: "25px",
          }}
          onFocus={() => {
            setIsComment(true);
          }}
        />
      )}
    </ListGroup.Item>
  );
};

export default CommentForm;
