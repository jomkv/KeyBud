import { Container } from "react-bootstrap";

import NavbarComponent from "../components/NavbarComponent";

function Messages() {
  return (
    <div className="bg-light">
      <NavbarComponent />

      <Container className="mb-3">Messages</Container>
    </div>
  );
}

export default Messages;
