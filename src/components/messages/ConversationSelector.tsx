import { Container } from "react-bootstrap";

import ConversationOption from "./ConversationOption";

interface IConversationSelectorProps {
  setConversation: React.Dispatch<React.SetStateAction<string>>;
}

const conversationList = [
  {
    id: "1",
    name: "User 1",
    recentMessage: "Lorem ipsum dolor sit ame.....",
  },
  {
    id: "2",
    name: "User 2",
    recentMessage: "Lorem ipsum dolor sit ame.....",
  },
  {
    id: "3",
    name: "User 3",
    recentMessage: "Lorem ipsum dolor sit ame.....",
  },
];

const ConversationSelector: React.FC<IConversationSelectorProps> = ({
  setConversation,
}) => {
  return (
    <div
      className="h-100 conversation-selector bg-secondary"
      style={{ color: "white" }}
    >
      <div
        className="border-bottom border-light w-100 d-flex justify-content-center align-items-center pt-2"
        style={{
          height: "10%",
        }}
      >
        <p className="fs-3">Messages</p>
      </div>
      <Container
        fluid
        className="bg-secondary pt-3"
        style={{
          color: "white",
          height: "90%",
          maxHeight: "90%",
          overflowY: "auto",
        }}
      >
        {conversationList.map((conversation, index) => (
          <ConversationOption
            key={index}
            conversation={conversation}
            setConversation={setConversation}
          />
        ))}
      </Container>
    </div>
  );
};

export default ConversationSelector;
