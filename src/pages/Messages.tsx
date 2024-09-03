import { Container, Row, Col } from "react-bootstrap";

import NavbarComponent from "../components/NavbarComponent";
import ConversationSelector from "../components/messages/ConversationSelector";
import Conversation from "../components/messages/Conversation";

function Messages() {
  return (
    <div className="bg-light h-100 bg-light">
      <NavbarComponent />

      <div
        className="w-100 d-flex"
        style={{
          height: "calc(100vh - 76px)",
          overflow: "auto",
        }}
      >
        <ConversationSelector />
        <Conversation />
      </div>
    </div>
  );
}

export default Messages;
