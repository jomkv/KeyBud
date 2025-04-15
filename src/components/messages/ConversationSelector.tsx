import { Button, Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

import ConversationOption from "./ConversationOption";
import { useGetConversationsQuery } from "../../state/slices/messagesApiSlice";
import OptionSkeleton from "./OptionSkeleton";
import { createNew } from "../../state/slices/conversationSlice";
import { IConvo } from "../../@types/messageType";
import { useSocketContext } from "../../context/SocketContext";
import { useUserContext } from "../../context/UserContext";

const ConversationSelector: React.FC = () => {
  const [conversations, setConversations] = useState<IConvo[]>([]);

  const {
    data: conversationsRes,
    isError,
    isLoading,
    isSuccess,
  } = useGetConversationsQuery();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { newConversationEvent, setNewConversationEvent } = useSocketContext();
  const { user } = useUserContext();

  useEffect(() => {
    if (isError) {
      navigate("/");
      toast.warn("Something went wrong. Please try again later.");
    }
  }, [isError, navigate]);

  useEffect(() => {
    if (isSuccess && conversationsRes) {
      setConversations(conversationsRes);
    }
  }, [conversationsRes, isSuccess]);

  useEffect(() => {
    if (!user || !newConversationEvent) return;

    const participantIds = newConversationEvent.participants.map(
      (participant) => participant._id
    );

    if (!participantIds.includes(user._id)) return;

    const conversationExists = conversations.some(
      (conversation) => conversation._id === newConversationEvent._id
    );

    if (!conversationExists) {
      setConversations((prev) => [...prev, newConversationEvent]);
    }

    setNewConversationEvent(null);
  }, [newConversationEvent]);

  const handleCreateNew = () => {
    dispatch(createNew());
  };

  const renderConversationOptions = () => {
    if (isLoading) {
      return (
        <>
          <OptionSkeleton />
          <OptionSkeleton />
          <OptionSkeleton />
        </>
      );
    }

    if (isSuccess && conversations.length > 0) {
      return conversations.map((conversation, index) => (
        <ConversationOption key={index} conversation={conversation} />
      ));
    }
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
        {renderConversationOptions()}
      </Container>
    </div>
  );
};

export default ConversationSelector;
