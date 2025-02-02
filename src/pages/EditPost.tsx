import NavbarComponent from "../components/NavbarComponent";
import {
  useEditPostMutation,
  useGetPostQuery,
} from "../state/slices/postsApiSlice";
import definedOrRedirect from "../utils/definedOrRedirect";

import { Container } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import PostFormSkeleton from "../components/post_form/PostFormSkeleton";
import PostForm from "../components/post_form/PostForm";

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
