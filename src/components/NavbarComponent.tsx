import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { AppDispatch, RootState } from "../state/store";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../state/user/userSlice";

function NavbarComponent() {
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => {
    dispatch(logout());
    window.location.reload();
  };

  return (
    <Navbar sticky="top" expand="lg" className="bg-secondary">
      <Container fluid>
        <Navbar.Brand href="/">
          <img alt="logo" src="/images/Final Logo.svg" height={60} />
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="navbarScroll"
          style={{
            color: "white",
          }}
        />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            {user && (
              <Nav.Link
                href="/messages"
                style={{
                  color: "white",
                }}
              >
                Messages
              </Nav.Link>
            )}
            {user && (
              <Nav.Link
                href="/profile"
                style={{
                  color: "white",
                }}
              >
                Profile
              </Nav.Link>
            )}
            {user && (
              <Nav.Link
                href=""
                style={{
                  color: "white",
                }}
                onClick={handleLogout}
              >
                Logout
              </Nav.Link>
            )}
            {!user && (
              <Nav.Link
                href="/login"
                style={{
                  color: "white",
                }}
              >
                Login
              </Nav.Link>
            )}
            {!user && (
              <Nav.Link
                href="/signup"
                style={{
                  color: "white",
                }}
              >
                Signup
              </Nav.Link>
            )}
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
