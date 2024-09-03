import { Row, Col } from "react-bootstrap";

interface IOptionProps {
  conversation: {
    id: string;
    name: string;
    recentMessage: string;
  };
  setConversation: React.Dispatch<React.SetStateAction<string>>;
}

const ConversationOption: React.FC<IOptionProps> = ({
  conversation,
  setConversation,
}) => {
  const handleCLick = () => {
    setConversation(conversation.id);
  };

  return (
    <Row
      className="gx-0 chat-container pt-2 pb-2 rounded"
      onClick={handleCLick}
      style={{
        cursor: "pointer",
      }}
    >
      <Col md={12} lg={2} className="d-flex justify-content-center">
        <img
          src="images/user_icon.png"
          alt="icon"
          className="rounded-circle me-0 p-2"
          style={{
            objectFit: "cover",
            width: "3.5rem",
            height: "3.5rem",
          }}
        />
      </Col>
      <Col
        md={0}
        lg={10}
        className="ps-2 d-flex flex-column justify-content-center d-none d-lg-block"
      >
        <p className="m-0 p-0 fs-5 fw-bold">{conversation.name}</p>
        <p className="m-0 p-0 fw-light">{conversation.recentMessage}</p>
      </Col>
    </Row>
  );
};

export default ConversationOption;
