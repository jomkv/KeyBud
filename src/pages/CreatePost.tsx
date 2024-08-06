import NavbarComponent from "../components/NavbarComponent";
import ChatWidget from "../components/ChatWidget";

import { Container, Button, Form } from "react-bootstrap";
import "react-quill/dist/quill.snow.css";
import { useEffect } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DevTool } from "@hookform/devtools";
import { z } from "zod";

const schema = z.object({
  title: z.string().nonempty("Title is required").max(150, "Title is too long"),
  body: z.string().nonempty("Body is required"),
  // images: z.object().nonempty({ message: "At least one image is required." })
});

interface IForm {
  title: string;
  body: string;
  images: {};
}

function CreatePost() {
  const form = useForm<IForm>({
    defaultValues: {
      title: "",
      body: "",
    },
    resolver: zodResolver(schema),
  });
  const { register, handleSubmit, formState, control } = form;
  const { errors } = formState;

  useEffect(() => {
    register("body", { required: true, minLength: 15 });
  }, [register]);

  const onSubmit = (data: IForm) => {
    console.log(data);
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
              {...register("body")}
              isInvalid={errors.body?.message ? true : false}
            />
            <Form.Control.Feedback type="invalid">
              {errors.body?.message}
            </Form.Control.Feedback>
          </Form.Group>
          {/* <Form.Group className="mb-3">
            <Form.Label className="fs-5 fw-medium">Body *</Form.Label>
            <ReactQuill
              modules={{
                toolbar: [
                  ["bold", "italic", "underline"],
                  [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
                  ["clean"],
                ],
              }}
              value={editorContent}
              onChange={onEditorStateChange}
            />
            <Form.Control.Feedback type="invalid">
              {errors.body?.message}
            </Form.Control.Feedback>
          </Form.Group> */}
          <Form.Group className="mb-3">
            <Form.Label className="fs-5 fw-medium">Keyboard Images</Form.Label>
            <Form.Control
              type="file"
              {...register("images")}
              isInvalid={errors.images?.message ? true : false}
              multiple
              size="lg"
            />
            <Form.Control.Feedback type="invalid">
              {errors.images?.message}
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
            >
              Submit
            </Button>
          </div>
        </Form>
      </Container>
      <ChatWidget />
      <DevTool control={control} />
    </div>
  );
}

export default CreatePost;
