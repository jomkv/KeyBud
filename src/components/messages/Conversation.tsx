import { useSelector } from "react-redux";
import { useEffect } from "react";

import SendMessageForm from "./SendMessageForm";
import { RootState } from "../../state/store";
import { Container, Row } from "react-bootstrap";
import MessageOut from "./MessageOut";
import MessageIn from "./MessageIn";

function Conversation() {
  const conversation = useSelector((state: RootState) => state.conversation);

  useEffect(() => {
    console.log(conversation);
  }, [conversation]);

  return (
    <div className="h-100 bg-secondary conversation-container border-start border-light rounded-end">
      <div
        className="border-bottom border-light w-100 d-flex justify-content-center align-items-center pt-2"
        style={{
          height: "10%",
          color: "white",
        }}
      >
        <p className="fs-3">John Doe</p>
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
        <Row xs={{ cols: 1 }} sm={{ cols: 1 }}>
          <MessageOut message="hello world" />
          <MessageIn message="hello to you too gangy" />
          <MessageIn message="secondary msg" showIcon={true} />
          <MessageOut message="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officia tenetur reiciendis modi consequatur nulla aperiam eligendi maiores, sunt nobis corrupti facere facilis laudantium sequi atque maxime! Voluptatem iure pariatur et!" />
        </Row>
      </Container>

      <SendMessageForm />
    </div>
  );
}

export default Conversation;
