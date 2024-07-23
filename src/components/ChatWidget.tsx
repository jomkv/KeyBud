import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

function ChatWidget() {
  return (
    <Navbar
      sticky="bottom"
      className="bg-secondary pb-2 p-3 rounded-top-4 shadow-lg position-absolute bottom-0 end-30"
      style={{
        color: "white",
        width: "16rem",
        bottom: "0",
        right: "20px",
        float: "right",
      }}
    >
      <Container fluid>
        <div className="d-flex justify-content-between align-items-center w-100">
          <p className="fs-4 mb-0">Messages</p>
          <i className="bi bi-chevron-double-up fs-4"></i>
        </div>
      </Container>
    </Navbar>
  );
}

export default ChatWidget;
