import { Row } from "react-bootstrap";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import MessageOut from "./MessageOut";
import MessageIn from "./MessageIn";
import { IMessage } from "../../@types/messageType";
import { useGetConversationQuery } from "../../state/slices/messagesApiSlice";
import { RootState } from "../../state/store";
import { IUserState } from "../../@types/userType";

interface IProps {
  convoId: string;
}

const isSender = (message: IMessage, user: IUserState) => {
  return message.senderId === user.userInfo?.id;
};

const Messages: React.FC<IProps> = ({ convoId }) => {
  const {
    data: conversation,
    isLoading,
    isError,
    isSuccess,
  } = useGetConversationQuery(convoId);
  const user = useSelector((state: RootState) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      navigate("/");
      toast.warn("Something went wrong. Please try again later.");
    }
  }, [isError, navigate]);

  return (
    <Row xs={{ cols: 1 }} sm={{ cols: 1 }}>
      {isLoading && (
        // TODO: Create skeleton
        <p>Loading...</p>
      )}
      {isSuccess &&
        conversation.messages.map((message: IMessage, i: number) => {
          if (isSender(message, user)) {
            return <MessageOut key={i} message={message.message} />;
          } else {
            let showIcon = false;
            const messages = conversation.messages;

            if (messages.length - 1 === i) {
              showIcon = true;
            } else if (isSender(messages[i + 1], user)) {
              showIcon = true;
            }

            return (
              <MessageIn
                key={i}
                message={message.message}
                showIcon={showIcon}
              />
            );
          }
        })}
    </Row>
  );
};

export default Messages;
