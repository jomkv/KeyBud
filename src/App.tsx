import React, { Fragment } from "react";
import { Stack, Container } from "@mui/material";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Post from "./pages/Post";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      {/* <Navbar /> */}
      {/* <Container sx={{ flexGrow: 1, paddingTop: "25px" }}>
      </Container> */}

      <Register />
    </div>
  );
}

export default App;
