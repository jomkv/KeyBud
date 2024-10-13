import { Container } from "react-bootstrap";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import ConversationOption from "./ConversationOption";
import { useGetConversationsQuery } from "../../state/slices/messagesApiSlice";
import OptionSkeleton from "./OptionSkeleton";
import SearchConversation from "./SearchConversation";

const ConversationSelector: React.FC = () => {
  const {
    data: conversations,
    isError,
    isLoading,
  } = useGetConversationsQuery();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      navigate("/");
      toast.warn("Something went wrong. Please try again later.");
    }
  }, [isError, navigate]);

  return (
    <div
      className="h-100 conversation-selector bg-secondary rounded-start"
      style={{ color: "white" }}
    >
      <div
        className="border-bottom border-light w-100 d-flex justify-content-center align-items-center pt-2"
        style={{
          height: "10%",
        }}
      >
        <p className="fs-3 d-none d-lg-block">Messages</p>
      </div>
      <Container
        fluid
        className="bg-secondary pt-3 rounded-start"
        style={{
          color: "white",
          height: "90%",
          maxHeight: "90%",
          overflowY: "auto",
        }}
      >
        <SearchConversation />
        {isLoading && (
          <>
            <OptionSkeleton />
            <OptionSkeleton />
            <OptionSkeleton />
          </>
        )}
        {conversations &&
          conversations.length > 0 &&
          conversations.map((conversation, index) => (
            <ConversationOption key={index} conversation={conversation} />
          ))}
      </Container>
    </div>
  );
};

export default ConversationSelector;
