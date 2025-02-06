import { Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import MessageOut from "./MessageOut";
import MessageIn from "./MessageIn";
import { IMessage } from "../../@types/messageType";
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

const Messages: React.FC<IProps> = ({ convoId, scrollToBottom }) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const { user } = useUserContext();
  const navigate = useNavigate();
  const { socket } = useSocketContext();

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
    if (socket) {
      socket.on("newMessage", (data: IMessage) => {
        setMessages((prev) => [...prev, data]);
      });

      return () => {
        socket.off("newMessage");
      };
    }
  }, [socket, messages, setMessages]);

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

        return (
          <MessageIn key={i} message={message.message} showIcon={showIcon} />
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
