import Home from "./pages/Home";
import Post from "./pages/Post";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div style={{ height: "100vh", width: "100vw" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
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
