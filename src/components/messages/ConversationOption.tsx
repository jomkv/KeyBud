import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { IConvo } from "../../@types/messageType";
import { setConversation } from "../../state/slices/conversationSlice";
import { RootState } from "../../state/store";

interface IOptionProps {
  conversation: IConvo;
}

const ConversationOption: React.FC<IOptionProps> = ({ conversation }) => {
  const selectedConversation = useSelector(
    (state: RootState) => state.conversation
  );
  const dispatch = useDispatch();
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = () => {
    dispatch(setConversation(conversation));
  };

  useEffect(() => {
    if (selectedConversation._id === conversation._id) {
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
          src="images/user_icon.png"
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
        <p className="m-0 p-0 fs-5 fw-bold">
          {conversation.participants[1].username}
        </p>
        <p className="m-0 p-0 fw-light">{conversation.messages[0].message}</p>
      </Col>
    </Row>
  );
};

export default ConversationOption;
