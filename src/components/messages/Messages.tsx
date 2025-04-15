import { Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import MessageOut from "./MessageOut";
import MessageIn from "./MessageIn";
import { IConvo, IMessage } from "../../@types/messageType";
import { useLazyGetConversationQuery } from "../../state/slices/messagesApiSlice";
import { IUser } from "../../@types/userType";
import { useSocketContext } from "../../context/SocketContext";
import { useUserContext } from "../../context/UserContext";

interface IProps {
  convoId: string | null | undefined;
  scrollToBottom: () => void;
}

const isSender = (message: IMessage, user: IUser | null) => {
  try {
    return message.senderId === user?._id;
  } catch (error) {
    return false;
  }
};

const getSender = (convo: IConvo, userId: string): IUser | null => {
  const sender = convo.participants.find((user: IUser) => user._id !== userId);
  return sender || null;
};

const Messages: React.FC<IProps> = ({ convoId, scrollToBottom }) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const { user } = useUserContext();
  const navigate = useNavigate();
  const { newMessageEvent } = useSocketContext();

  const [
    getConversation,
    { data: conversation, isLoading, isError, isSuccess },
  ] = useLazyGetConversationQuery();

  useEffect(() => {
    if (convoId) {
      getConversation(convoId);
    }
  }, [convoId]);

  useEffect(() => {
    if (isError) {
      navigate("/");
      toast.warn("Something went wrong. Please try again later.");
    }
  }, [isError, navigate]);

  useEffect(() => {
    if (isSuccess && conversation) {
      setMessages(conversation.messages);
    }
  }, [isSuccess, conversation]);

  useEffect(() => {
    scrollToBottom();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, conversation]);

  useEffect(() => {
    if (newMessageEvent && convoId === newMessageEvent.conversationId) {
      setMessages((prev) => [...prev, newMessageEvent.newMessage]);
    }
  }, [newMessageEvent]);

  const renderMessages = () => {
    return messages.map((message: IMessage, i: number) => {
      if (isSender(message, user)) {
        return <MessageOut key={i} message={message.message} />;
      } else {
        let showIcon = false;
        if (messages.length - 1 === i) {
          showIcon = true;
        } else if (isSender(messages[i + 1], user)) {
          showIcon = true;
        }
        const sender = getSender(conversation!, user?._id!);

        return (
          <MessageIn
            key={i}
            icon={sender && sender.icon ? sender.icon : null}
            message={message.message}
            showIcon={showIcon}
          />
        );
      }
    });
  };

  return (
    <Row xs={{ cols: 1 }} sm={{ cols: 1 }}>
      {isLoading && (
        // TODO: Create skeleton
        <p>Loading...</p>
      )}
      {isSuccess && renderMessages()}
    </Row>
  );
};

export default Messages;
