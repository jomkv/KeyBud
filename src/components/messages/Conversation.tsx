import { useState } from "react";
import { Button, Form } from "react-bootstrap";

function Conversation() {
  const [buttonIcon, setButtonIcon] = useState<string>("bi-send");

  const handleSubmit = () => {};

  return (
    <div className="h-100 conversation-container border-start border-light">
      <div
        className="border-bottom border-light w-100 d-flex justify-content-center align-items-center pt-2"
        style={{
          height: "10%",
          color: "white",
        }}
      >
        <p className="fs-3">John Doe</p>
      </div>
      <div
        className="d-flex flex-column justify-content-end ps-2 pe-2"
        style={{
          height: "80%",
          maxHeight: "80%",
          overflow: "auto",
        }}
      >
        <div
          className="align-self-end"
          style={{
            maxWidth: "48%",
          }}
        >
          <p className="fs-4 p-3 rounded bg-primary">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam laborum
            inventore mollitia accusantium, aliquam neque sed necessitatibus
            cupiditate quaerat eos! Ut quod voluptate totam nesciunt blanditiis
            unde nulla dignissimos dolores?
          </p>
        </div>
        <div
          className="align-self-start d-flex"
          style={{
            maxWidth: "50%",
          }}
        >
          <img
            src="images/user_icon.png"
            alt="icon"
            className="rounded-circle me-0 p-2 align-self-end"
            style={{
              objectFit: "cover",
              width: "3.5rem",
              height: "3.5rem",
            }}
          />
          <p className="fs-4 p-3 mb-2 rounded bg-primary-subtle">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam laborum
            inventore mollitia accusantium, aliquam neque sed necessitatibus
            cupiditate quaerat eos! Ut quod voluptate totam nesciunt blanditiis
            unde nulla dignissimos dolores?
          </p>
        </div>
      </div>

      <Form
        className="d-flex p-3"
        style={{
          height: "10%",
        }}
        onSubmit={handleSubmit}
      >
        <Form.Control
          size="lg"
          type="text"
          placeholder="Message goes here"
          style={{
            borderRadius: "25px",
          }}
        />
        <Button
          type="submit"
          style={{
            color: "#8c52ff",
            backgroundColor: "transparent",
            border: "none",
          }}
          onMouseOver={() => {
            setButtonIcon("bi-send-fill");
          }}
          onMouseLeave={() => {
            setButtonIcon("bi-send");
          }}
        >
          <i className={`bi ${buttonIcon} fs-2`}></i>
        </Button>
      </Form>
    </div>
  );
}

export default Conversation;
