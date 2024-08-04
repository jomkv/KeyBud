import NavbarComponent from "../components/NavbarComponent";
import ChatWidget from "../components/ChatWidget";

import { Container, Button, Row, Col, Form } from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState, useEffect } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DevTool } from "@hookform/devtools";
import { z } from "zod";

const schema = z.object({
  title: z.string().nonempty("Title is required"),
  body: z.string().nonempty("Body is required"),
});

interface IForm {
  title: string;
  body: string;
}

function CreatePost() {
  const [titleChars, setTitleChars] = useState<number>(0);

  const form = useForm<IForm>({
    defaultValues: {
      title: "",
      body: "",
    },
    resolver: zodResolver(schema),
  });
  const { register, handleSubmit, formState, control, setValue, watch } = form;
  const { errors } = formState;

  useEffect(() => {
    register("body", { required: true, minLength: 15 });
  }, [register]);

  const onEditorStateChange = (editorState: any) => {
    setValue("body", editorState);
  };

  const editorContent = watch("body");

  const onSubmit = (data: IForm) => {
    console.log(data);
  };

  // const titleHandleChange = (e: any) => {
  //   const val = e.target.value;

  //   if (val.length > 150) {
  //     return;
  //   }

  //   setTitle(val);
  //   setTitleChars(val.length);
  // };

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
            />
            <div className="w-100 d-flex justify-content-end pe-1">
              <Form.Text
                className="fs-6"
                style={{
                  color: "white",
                }}
              >
                {titleChars}/150
              </Form.Text>
            </div>
            <Form.Control.Feedback type="invalid">
              {errors.title?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
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
