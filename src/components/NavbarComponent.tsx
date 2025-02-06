import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

import { useLogoutMutation } from "../state/slices/authApiSlice";
import { useUserContext } from "../context/UserContext";

function NavbarComponent() {
  const { user, setUser } = useUserContext();
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      if (setUser) setUser(null);
      navigate("/login");
      toast.success("Logged out");
    } catch (error: any) {
      toast.warn(error?.data?.message || "An error occurred");
    }
  };

  const handleSubmit = (formData: any) => {
    navigate(`/search?search=${search}`);
  };

  useEffect(() => {
    const searchValue = searchParams.get("search");

    if (searchValue) {
      setSearch(searchValue);
    }
  }, [searchParams.get("search")]);

  return (
    <Navbar
      sticky="top"
      expand="lg"
      style={{
        position: "sticky",
        backgroundColor: "#2b2b2b",
      }}
    >
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
                to={`/profile/${user._id}`}
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
                className="p-0 m-0"
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
          <Form className="d-flex" onSubmit={handleSubmit}>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              name="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
