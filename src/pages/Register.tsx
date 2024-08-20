import { Link } from "react-router-dom";

import SignupForm from "../components/signup/SignupForm";

function Register() {
  return (
    <div
      className="w-100 h-100 d-flex justify-content-evenly align-items-center "
      style={{
        backgroundColor: "#1F1F1F",
      }}
    >
      <Link to="/">
        <img
          className="d-none d-md-block"
          alt="logo"
          src="/images/Logo with Phrase.svg"
        />
      </Link>

      <SignupForm />
    </div>
  );
}

export default Register;
