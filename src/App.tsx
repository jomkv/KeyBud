// * Libraries
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// * Local Imports
import Home from "./pages/Home";
import Post from "./pages/Post";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import CreatePost from "./pages/CreatePost";
import Messages from "./pages/Messages";
import ToastContainer from "./components/ToastContainer";

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
          <Route path="/messages" element={<Messages />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-post" element={<CreatePost />} />
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
