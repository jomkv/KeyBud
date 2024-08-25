import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { AppDispatch, RootState } from "../state/store";
import { clearCredentials } from "../state/slices/authSlice";
import { useLogoutMutation } from "../state/slices/usersApiSlice";

function NavbarComponent() {
  const dispatch = useDispatch<AppDispatch>();

  const { userInfo: user } = useSelector((state: RootState) => state.auth);
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      dispatch(clearCredentials());
      navigate("/login");
      toast.success("Logged out");
    } catch (error: any) {
      toast.warn(error.data.message || "An error occurred");
    }
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
              <button
                className="me-3"
                style={{
                  color: "white",
                  textDecoration: "none",
                  backgroundColor: "transparent",
                  border: "none",
                }}
                onClick={handleLogout}
              >
                Logout
              </button>
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
