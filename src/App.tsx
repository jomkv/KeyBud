// * Libraries
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// * Local Imports
import Home from "./pages/Home";
import Post from "./pages/Post";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import CreatePost from "./pages/CreatePost";

function App() {
  return (
    <Router>
      <div
        className="overflow-x-hidden"
        style={{ height: "100vh", width: "100vw" }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/post" element={<Post />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-post" element={<CreatePost />} />
        </Routes>
      </div>
    </Router>
    // <div style={{ height: "100vh", width: "100vw" }}>
    //   <Home />
    // </div>
  );
}

export default App;
