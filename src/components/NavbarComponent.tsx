import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

function NavbarComponent() {
  const [newMessages, setNewMessages] = useState<number>(2);
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const handleShowMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    // <nav
    //   className="navbar navbar-expand-lg"
    //   style={{
    //     backgroundColor: "#1f1f1f",
    //     color: "white",
    //   }}
    // >
    //   <div className="row w-100 m-0 p-0">
    //     <div className="col-4 d-flex align-items-center">
    //       <img alt="logo" src="/images/Final Logo.svg" height={60} />
    //     </div>
    //     <div className="col-4 d-flex align-items-center justify-content-center">
    //       <form className="d-flex" role="search">
    //         <input
    //           className="form-control"
    //           type="search"
    //           placeholder="Search"
    //           aria-label="Search"
    //         />
    //       </form>
    //     </div>
    //     <div className="col-4 d-flex align-items-center justify-content-end">
    //       <div className="d-flex align-items-center">
    //         <a
    //           className="btn btn-link"
    //           aria-current="page"
    //           href="/"
    //           style={{
    //             color: "#8c52ff",
    //           }}
    //         >
    //           <i className="bi bi-chat h2"></i>
    //         </a>
    //         <a
    //           className="btn btn-link"
    //           aria-current="page"
    //           href="/"
    //           style={{
    //             color: "#8c52ff",
    //           }}
    //         >
    //           <i className="bi bi-house h2"></i>
    //         </a>
    //         <a
    //           className="btn btn-link"
    //           aria-current="page"
    //           href="/"
    //           style={{
    //             color: "#8c52ff",
    //           }}
    //         >
    //           <i className="bi bi-person h2"></i>
    //         </a>
    //         <a
    //           className="btn btn-link"
    //           aria-current="page"
    //           data-bs-toggle="tooltip"
    //           data-bs-placement="bottom"
    //           data-bs-title="Logout"
    //           href="/"
    //           style={{
    //             color: "#8c52ff",
    //           }}
    //         >
    //           <i className="bi bi-box-arrow-right h2"></i>
    //         </a>
    //         {/* <a
    //           className="btn btn-link"
    //           aria-current="page"
    //           href="/"
    //           style={{
    //             color: "#8c52ff",
    //           }}
    //         >
    //           <i className="bi bi-box-arrow-in-right h2"></i>
    //         </a> */}
    //       </div>
    //     </div>
    //   </div>
    // </nav>
    <Navbar expand="lg" className="bg-secondary">
      <Container fluid>
        <Navbar.Brand href="#">
          <img alt="logo" src="/images/Final Logo.svg" height={60} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link
              href="#action1"
              style={{
                color: "white",
              }}
            >
              Home
            </Nav.Link>
            <Nav.Link
              href="#action1"
              style={{
                color: "white",
              }}
            >
              Messages
            </Nav.Link>
            <Nav.Link
              href="#action1"
              style={{
                color: "white",
              }}
            >
              Profile
            </Nav.Link>
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
