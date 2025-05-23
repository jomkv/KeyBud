import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { Container } from "react-bootstrap";

import SendMessageForm from "./SendMessageForm";
import { RootState } from "../../state/store";
import Messages from "./Messages";
import NewConversationForm from "./NewConversationForm";
import { useUserContext } from "../../context/UserContext";

function Conversation() {
  const [recipientName, setRecipientName] = useState<string>("");

  const selectedConversation = useSelector(
    (state: RootState) => state.conversation
  );

  const { user } = useUserContext();

  useEffect(() => {
    if (selectedConversation.isSet && selectedConversation.recipient) {
      setRecipientName(selectedConversation.recipient.username);
    }

    if (!selectedConversation.isSet || selectedConversation.createNew) {
      setRecipientName("");
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
        <p className="fs-3">
          {selectedConversation.createNew ? "New Chat" : recipientName}
        </p>
      </div>
      <Container
        fluid
        className="p-3"
        style={{
          height: "80%",
          maxHeight: "80%",
          overflow: "auto",
        }}
      >
        {selectedConversation.isSet && (
          <>
            <Messages
              convoId={selectedConversation.convoId}
              scrollToBottom={scrollToBottom}
            />
            <div ref={messagesEndRef} />
          </>
        )}
        {selectedConversation.createNew && <NewConversationForm />}
      </Container>

      {!selectedConversation.createNew && <SendMessageForm />}
    </div>
  );
}

export default Conversation;
