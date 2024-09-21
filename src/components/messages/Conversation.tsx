import { useSelector } from "react-redux";
import { useEffect } from "react";

import SendMessageForm from "./SendMessageForm";
import { RootState } from "../../state/store";

function Conversation() {
  const conversationId = useSelector(
    (state: RootState) => state.conversation.conversationId
  );

  useEffect(() => {
    console.log(conversationId);
  }, [conversationId]);

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
      <div
        className="d-flex flex-column justify-content-end ps-2 pe-2"
        style={{
          height: "80%",
          maxHeight: "80%",
          overflow: "auto",
        }}
      >
        <div
          className="align-self-end"
          style={{
            maxWidth: "48%",
          }}
        >
          <p className="fs-4 p-3 rounded bg-primary">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam laborum
            inventore mollitia accusantium, aliquam neque sed necessitatibus
            cupiditate quaerat eos! Ut quod voluptate totam nesciunt blanditiis
            unde nulla dignissimos dolores?
          </p>
        </div>
        <div
          className="align-self-start d-flex"
          style={{
            maxWidth: "50%",
          }}
        >
          <img
            src="images/user_icon.png"
            alt="icon"
            className="rounded-circle me-0 p-2 align-self-end"
            style={{
              objectFit: "cover",
              width: "3.5rem",
              height: "3.5rem",
            }}
          />
          <p className="fs-4 p-3 mb-2 rounded bg-primary-subtle">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam laborum
            inventore mollitia accusantium, aliquam neque sed necessitatibus
            cupiditate quaerat eos! Ut quod voluptate totam nesciunt blanditiis
            unde nulla dignissimos dolores?
          </p>
        </div>
      </div>

      <SendMessageForm />
    </div>
  );
}

export default Conversation;
