import React from "react";
import { Col } from "react-bootstrap";

interface IProps {
  message: string;
}

const MessageOut: React.FC<IProps> = ({ message }) => {
  return (
    <Col
      xs={{ span: 8, offset: 4 }}
      sm={{ span: 8, offset: 4 }}
      md={{ span: 7, offset: 5 }}
      lg={{ span: 6, offset: 6 }}
      className="d-flex justify-content-end"
    >
      <p className="fs-4 p-3 rounded bg-primary">{message}</p>
    </Col>
  );
};

export default MessageOut;
