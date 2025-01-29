import { Button, Container } from "react-bootstrap";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

import ConversationOption from "./ConversationOption";
import { useGetConversationsQuery } from "../../state/slices/messagesApiSlice";
import OptionSkeleton from "./OptionSkeleton";
import { createNew } from "../../state/slices/conversationSlice";

const ConversationSelector: React.FC = () => {
  const {
    data: conversations,
    isError,
    isLoading,
  } = useGetConversationsQuery();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      navigate("/");
      toast.warn("Something went wrong. Please try again later.");
    }
  }, [isError, navigate]);

  const handleCreateNew = () => {
    dispatch(createNew());
  };

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
        <Button
          className="w-100 fs-5 fw-semibold mb-3"
          variant="light"
          style={{ height: "4rem" }}
          onClick={handleCreateNew}
        >
          Create new
        </Button>
        {/* <SearchConversation /> */}
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
