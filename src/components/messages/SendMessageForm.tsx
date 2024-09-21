import { useState } from "react";
import { Button, Form } from "react-bootstrap";

function SendMessageForm() {
  const [buttonIcon, setButtonIcon] = useState<string>("bi-send");

  const handleSubmit = () => {};

  return (
    <Form
      className="d-flex p-2"
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
  );
}

export default SendMessageForm;
