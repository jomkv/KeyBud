import NavbarComponent from "../components/NavbarComponent";
import Spinner from "../components/Spinner";
import { useCreatePostMutation } from "../state/slices/postsApiSlice";
import { IPostInput } from "../@types/postType";

import { Container, Button, Form } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";

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

function CreatePost() {
  const [createPost, { isLoading }] = useCreatePostMutation();

  const form = useForm<IForm>({
    defaultValues: {
      title: "",
      description: "",
      images: null,
    },
    resolver: zodResolver(schema),
  });
  const { register, handleSubmit, formState, reset } = form;
  const { errors } = formState;

  const onSubmit: SubmitHandler<IForm> = async (data: IPostInput) => {
    try {
      await createPost(data).unwrap();
      toast.success("Post created successfully");
    } catch (error) {
      console.log(error);
      toast.warn("An error occured while creating post");
    }

    reset();
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
        <Form
          className="bg-secondary p-4 mt-5 rounded-3"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          encType="multipart/form-data"
        >
          <p className="fs-2 fw-bold">Create post</p>
          <Form.Group className="mb-3">
            <Form.Label className="fs-5 fw-medium">Title *</Form.Label>
            <Form.Control
              className="fs-5"
              type="text"
              // onChange={titleHandleChange}
              {...register("title")}
              isInvalid={errors.title?.message ? true : false}
            />
            <Form.Control.Feedback type="invalid">
              {errors.title?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="fs-5 fw-medium">Body *</Form.Label>
            <Form.Control
              className="fs-5"
              as="textarea"
              rows={5}
              {...register("description")}
              isInvalid={errors.description?.message ? true : false}
            />
            <Form.Control.Feedback type="invalid">
              {errors.description?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="fs-5 fw-medium">Keyboard Images</Form.Label>
            <Form.Control
              type="file"
              {...register("images")}
              multiple
              accept="image/*"
              isInvalid={errors.images?.message ? true : false}
            ></Form.Control>
            <Form.Control.Feedback type="invalid">
              {/* {errors.images?.message} */}
            </Form.Control.Feedback>
          </Form.Group>
          <div className="w-100 d-flex justify-content-end pe-1">
            <Button
              variant="primary"
              className="p-4 pt-3 pb-3 fs-5 fw-semibold"
              type="submit"
              style={{
                color: "white",
                width: "10rem",
              }}
              disabled={isLoading}
            >
              {isLoading ? <Spinner /> : "Submit"}
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
}

export default CreatePost;
