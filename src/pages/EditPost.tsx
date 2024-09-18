import NavbarComponent from "../components/NavbarComponent";
import Spinner from "../components/Spinner";
import {
  useEditPostMutation,
  useGetPostQuery,
} from "../state/slices/postsApiSlice";
import { IPostInput } from "../@types/postType";
import definedOrRedirect from "../utils/definedOrRedirect";

import { Container, Button, Form } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import PostFormSkeleton from "../components/post_form/PostFormSkeleton";
import PostForm from "../components/post_form/PostForm";

const schema = z.object({
  title: z.string().nonempty("Title is required").max(150, "Title is too long"),
  description: z.string().nonempty("Body is required"),
  images: z.any(),
});

interface IForm {
  title: string;
  description: string;
  images: any;
}

function EditPost() {
  const [editPost, { isLoading }] = useEditPostMutation();
  const navigate = useNavigate();
  const { id } = useParams();

  definedOrRedirect(id);

  const {
    data: post,
    isLoading: isPostLoading,
    isError: isPostError,
  } = useGetPostQuery(id);

  useEffect(() => {
    if (isPostError) {
      navigate("/");
    }
  }, [isPostError, navigate]);

  const onSubmit = async (data: FormData) => {
    try {
      await editPost({ post: data, postId: id }).unwrap();
      toast.success("Post edit successfully");
      navigate(`/post/${id}`);
    } catch (error) {
      toast.warn("An error occured while editing post");
      navigate("/");
    }
  };

  return (
    <div className="bg-light">
      <NavbarComponent />

      <Container
        className="h-100"
        style={{
          color: "white",
        }}
      >
        {isPostLoading ? (
          <PostFormSkeleton />
        ) : (
          <PostForm
            onSubmit={onSubmit}
            isLoading={isLoading}
            defaultValues={post}
            isEdit={true}
          />
        )}
      </Container>
    </div>
  );
}

export default EditPost;
