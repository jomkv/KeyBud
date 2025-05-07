import { Link } from "react-router-dom";

import SignupForm from "../components/signup/SignupForm";

function Register() {
  return (
    <div
      className="w-100 h-100 d-flex justify-content-evenly align-items-center "
      style={{
        backgroundColor: "#1F1F1F",
        width: "100vw",
        minHeight: "100vh",
        overflowY: "auto",
      }}
    >
      <Link to="/">
        <img
          className="d-none d-lg-block"
          alt="logo"
          src="/images/Logo with Phrase.svg"
        />
      </Link>

      <div className="h-100 d-flex align-items-center p-5">
        <SignupForm />
      </div>
    </div>
  );
}

export default Register;
