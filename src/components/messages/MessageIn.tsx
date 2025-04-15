import React from "react";
import { Col } from "react-bootstrap";

interface IProps {
  message: string;
  icon: string | null;
  showIcon?: boolean;
}

const MessageIn: React.FC<IProps> = ({ message, showIcon, icon }) => {
  return (
    <>
      <Col lg={6} md={7} sm={8} xs={8} className="d-flex">
        <img
          src={icon || "images/user_icon.png"}
          alt="icon"
          className="rounded-circle me-0 p-2 align-self-end"
          style={{
            objectFit: "cover",
            width: "3.5rem",
            height: "3.5rem",
            opacity: showIcon ? 1 : 0,
          }}
        />

        <p className="fs-4 p-3 mb-2 rounded bg-primary-subtle">{message}</p>
      </Col>
      <Col xs={1} sm={1} /> {/* Empty column to push the message to the left */}
    </>
  );
};

export default MessageIn;
