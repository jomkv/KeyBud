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
import Protect from "./pages/Protect";
import EditPost from "./pages/EditPost";
import Search from "./pages/Search";
import EditProfile from "./pages/EditProfile";

function App() {
  return (
    <Router>
      <div
        className="overflow-x-hidden"
        style={{ height: "100vh", width: "100vw" }}
      >
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/search" element={<Search />} />

          {/* Protected Routes */}
          <Route element={<Protect />}>
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/edit-post/:id" element={<EditPost />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/edit-profile/:id" element={<EditProfile />} />
          </Route>
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
