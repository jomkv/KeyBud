import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

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
        <Link to="/">
          <img alt="logo" src="/images/Final Logo.svg" height={60} />
        </Link>

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
              <Link
                to="/messages"
                className="me-3"
                style={{
                  color: "white",
                  textDecoration: "none",
                }}
              >
                Messages
              </Link>
            )}
            {user && (
              <Link
                to="/profile"
                className="me-3"
                style={{
                  color: "white",
                  textDecoration: "none",
                }}
              >
                Profile
              </Link>
            )}
            {user && (
              <a
                href=""
                className="me-3"
                style={{
                  color: "white",
                  textDecoration: "none",
                }}
                onClick={handleLogout}
              >
                Logout
              </a>
            )}
            {!user && (
              <Link
                to="/login"
                className="me-3"
                style={{
                  color: "white",
                  textDecoration: "none",
                }}
              >
                Login
              </Link>
            )}
            {!user && (
              <Link
                to="/signup"
                className="me-3"
                style={{
                  color: "white",
                  textDecoration: "none",
                }}
              >
                Signup
              </Link>
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
