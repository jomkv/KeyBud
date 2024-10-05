import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { Container } from "react-bootstrap";

import SendMessageForm from "./SendMessageForm";
import { RootState } from "../../state/store";
import Messages from "./Messages";

function Conversation() {
  const [recipientName, setRecipientName] = useState<string>("");

  const selectedConversation = useSelector(
    (state: RootState) => state.conversation
  );
  const user = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (selectedConversation.isSet) {
      const name = selectedConversation.participants.find((participant) => {
        return participant._id !== user.userInfo?.id;
      })?.username;

      if (name) {
        setRecipientName(name);
      }
    }
  }, [selectedConversation, user]);

  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="h-100 bg-secondary conversation-container border-start border-light rounded-end">
      <div
        className="border-bottom border-light w-100 d-flex justify-content-center align-items-center pt-2"
        style={{
          height: "10%",
          color: "white",
        }}
      >
        <p className="fs-3">{recipientName}</p>
      </div>
      <Container
        fluid
        className="p-3"
        style={{
          height: "80%",
          maxHeight: "80%",
          overflow: "auto",
        }}
        ref={messagesEndRef}
      >
        {selectedConversation.isSet && (
          <Messages
            convoId={selectedConversation._id}
            scrollToBottom={scrollToBottom}
          />
        )}
      </Container>

      <SendMessageForm />
    </div>
  );
}

export default Conversation;
