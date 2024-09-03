import { Container } from "react-bootstrap";

import ConversationOption from "./ConversationOption";

function ConversationSelector() {
  return (
    <div className="h-100 w-25">
      <div
        className="border-bottom border-black w-100 d-flex justify-content-center align-items-center pt-2"
        style={{
          height: "10%",
        }}
      >
        <p className="fs-3">Messages</p>
      </div>
      <Container
        fluid
        className="p-0"
        style={{
          color: "white",
          height: "90%",
          maxHeight: "90%",
          overflowY: "auto",
        }}
      >
        <ConversationOption />
        <ConversationOption />
        <ConversationOption />
      </Container>
    </div>
  );
}

export default ConversationSelector;
