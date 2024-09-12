import { useRef, useState } from "react";
import { Button, OverlayTrigger, Popover } from "react-bootstrap";

import { IPost } from "../../@types/postType";

interface IOptionButtonProps {
  post: IPost;
}

const popover = (
  <Popover
    id="popover-basic"
    className="bg-secondary border border-light z-3 focus"
  >
    <Popover.Body>
      <button
        className="d-flex align-items-center"
        style={{
          backgroundColor: "transparent",
          border: "none",
          color: "white",
        }}
      >
        <i className="bi bi-pen me-2 fs-6" />
        <p className="p-0 m-0 fs-6">Edit</p>
      </button>
      <button
        className="d-flex align-items-center mt-2"
        style={{
          backgroundColor: "transparent",
          border: "none",
          color: "white",
        }}
      >
        <i className="bi bi-trash2 me-2 fs-6"></i>
        <p className="p-0 m-0 fs-6">Delete</p>
      </button>
      <button
        className="d-flex align-items-center mt-2"
        style={{
          backgroundColor: "transparent",
          border: "none",
          color: "white",
        }}
      >
        <i className="bi bi-pin me-2 fs-6" />
        <p className="p-0 m-0 fs-6">Pin</p>
      </button>
    </Popover.Body>
  </Popover>
);

const OptionButton: React.FC<IOptionButtonProps> = ({ post }) => {
  return (
    <OverlayTrigger
      trigger="click"
      placement="bottom"
      overlay={popover}
      rootClose
    >
      <Button
        className="m-0 p-0 fs-3"
        style={{
          color: "#8c52ff",
          backgroundColor: "transparent",
          border: "none",
        }}
      >
        <i className="bi bi-three-dots-vertical"></i>
      </Button>
    </OverlayTrigger>
  );
};

export default OptionButton;
