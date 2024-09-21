import NavbarComponent from "../components/NavbarComponent";
import ConversationSelector from "../components/messages/ConversationSelector";
import Conversation from "../components/messages/Conversation";

function Messages() {
  return (
    <div className="bg-light h-100">
      <NavbarComponent />

      <div
        className="w-100 d-flex p-1 p-sm-2 p-md-3 p-lg-4"
        style={{
          height: "calc(100vh - 76px)",
          overflow: "auto",
        }}
      >
        <ConversationSelector />
        <Conversation />
      </div>
    </div>
  );
}

export default Messages;
