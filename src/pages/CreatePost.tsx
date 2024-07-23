import NavbarComponent from "../components/NavbarComponent";
import ChatWidget from "../components/ChatWidget";

import { Container, Button, Row, Col, Form } from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState, useEffect } from "react";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [titleChars, setTitleChars] = useState(0);
  const [body, setBody] = useState("");

  const titleHandleChange = (e: any) => {
    const val = e.target.value;

    if (val.length > 150) {
      return;
    }

    setTitle(val);
    setTitleChars(val.length);
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
        <Form className="bg-secondary p-4 mt-5 rounded-3">
          <p className="fs-2 fw-bold">Create post</p>
          <Form.Group className="mb-3">
            <Form.Label className="fs-5 fw-medium">Title *</Form.Label>
            <Form.Control
              className="fs-5"
              type="text"
              value={title}
              onChange={titleHandleChange}
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
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="fs-5 fw-medium">Body *</Form.Label>
            <ReactQuill
              value={body}
              onChange={setBody}
              modules={{
                toolbar: [
                  ["bold", "italic", "underline"],
                  [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
                  ["clean"],
                ],
              }}
            />
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
    </div>
  );
}

export default CreatePost;
