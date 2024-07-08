import React, { Fragment } from "react";
import { Stack, Container } from "@mui/material";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Post from "./pages/Post";
import Login from "./pages/Login";
import Login2 from "./pages/Login2";
import Register from "./pages/Register";
import Register2 from "./pages/Register2";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div style={{ height: "100vh", width: "100vw" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register2 />} />
          <Route path="/post/:id" element={<Post />} />
        </Routes>
      </div>
    </Router>
    // <div style={{ height: "100vh", width: "100vw" }}>
    //   <Home />
    // </div>
  );
}

export default App;
