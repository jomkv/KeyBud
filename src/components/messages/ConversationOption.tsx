import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { IConvo, IMessage } from "../../@types/messageType";
import { setConversation } from "../../state/slices/conversationSlice";
import { RootState } from "../../state/store";
import { IUser } from "../../@types/userType";
import { useUserContext } from "../../context/UserContext";
import { useSocketContext } from "../../context/SocketContext";

interface IOptionProps {
  conversation: IConvo;
}

const findRecipient = (participants: IUser[], userId: string): IUser | null => {
  return participants.find((user) => user._id !== userId) || null;
};

const ConversationOption: React.FC<IOptionProps> = ({ conversation }) => {
  const selectedConversation = useSelector(
    (state: RootState) => state.conversation
  );

  const { user } = useUserContext();
  const { newMessageEvent } = useSocketContext();

  const dispatch = useDispatch();
  const [isSelected, setIsSelected] = useState(false);
  const [recipient, setRecipient] = useState<IUser | null>(null);
  const [messages, setMessages] = useState<IMessage[]>(conversation.messages);

  const handleClick = () => {
    if (!recipient || !recipient?._id) {
      return;
    }

    dispatch(
      setConversation({
        recipient: {
          recipientId: recipient._id,
          username: recipient.username as string,
        },
        messages: conversation.messages,
        convoId: conversation._id,
      })
    );
  };

  useEffect(() => {
    if (!user?._id) {
      return;
    }

    const rec: IUser | null = findRecipient(
      conversation.participants,
      user._id
    );

    if (rec) setRecipient(rec);
  }, []);

  useEffect(() => {
    if (
      newMessageEvent &&
      conversation._id === newMessageEvent.conversationId
    ) {
      setMessages((prev) => [newMessageEvent.newMessage]);
    }
  }, [newMessageEvent]);

  useEffect(() => {
    if (conversation._id === selectedConversation.convoId) {
      setIsSelected(true);
    } else {
      setIsSelected(false);
    }
  }, [selectedConversation]);

  return (
    <Row
      className="gx-0 pt-2 pb-2 rounded"
      onClick={handleClick}
      style={{
        cursor: "pointer",
        backgroundColor: isSelected ? "#363636" : "transparent",
      }}
    >
      <Col md={12} lg={2} className="d-flex justify-content-center">
        <img
          src={
            recipient && recipient.icon
              ? recipient.icon
              : "images/user_icon.png"
          }
          alt="icon"
          className="rounded-circle me-0 p-2"
          style={{
            objectFit: "cover",
            width: "3.5rem",
            height: "3.5rem",
          }}
        />
      </Col>
      <Col
        md={0}
        lg={10}
        className="ps-2 d-flex flex-column justify-content-center d-none d-lg-block"
      >
        <p className="m-0 p-0 fs-5 fw-bold">{recipient?.username}</p>
        <p className="m-0 p-0 fw-light">{messages[0].message}</p>
      </Col>
    </Row>
  );
};

export default ConversationOption;
