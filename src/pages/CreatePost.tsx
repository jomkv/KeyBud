import NavbarComponent from "../components/NavbarComponent";
import { useCreatePostMutation } from "../state/slices/postsApiSlice";
import PostForm from "../components/post_form/PostForm";

import { Container } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function CreatePost() {
  const [createPost, { isLoading }] = useCreatePostMutation();
  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    try {
      const res = await createPost(data).unwrap();
      navigate(`/post/${res.post?.postId}`);
    } catch (error) {
      toast.warn("An error occured while creating post.");
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
        <PostForm onSubmit={onSubmit} isLoading={isLoading} />
      </Container>
    </div>
  );
}

export default CreatePost;
