import React, { Fragment } from "react";
import { Stack, Container } from "@mui/material";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Post from "./pages/Post";

function App() {
  return (
    <Fragment>
      <Navbar />
      <Container sx={{ flexGrow: 1, paddingTop: "25px" }}>
        <Post />
      </Container>
    </Fragment>
  );
}

export default App;
