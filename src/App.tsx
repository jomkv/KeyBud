import React, { Fragment } from "react";
import { Stack, Container } from "@mui/material";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

function App() {
  return (
    <Fragment>
      <Navbar />
      <Container sx={{ flexGrow: 1, paddingTop: "25px" }}>
        <Home />
      </Container>
    </Fragment>
  );
}

export default App;
