import { Controller, useForm } from "react-hook-form";

function Login() {
  return (
    <div
      className="w-100 h-100 d-flex justify-content-evenly align-items-center "
      style={{
        backgroundColor: "#1F1F1F",
      }}
    >
      <img
        className="d-none d-md-block"
        alt="logo"
        src="/images/Logo with Phrase.svg"
      />
      <div
        className="p-5 rounded"
        style={{
          backgroundColor: "#d1cdc4",
          color: "#1f1f1f",
          width: "390px",
        }}
      >
        <p className="fs-1 fw-bold">Login</p>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Username / Email
          </label>
          <input type="email" className="form-control" id="email" />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Password
          </label>
          <input type="password" className="form-control" id="email" />
        </div>
        <div className="mb-3">
          <button
            className="btn btn-primary w-100 p-3 fw-bold"
            style={{ backgroundColor: "#8c52ff", borderColor: "#8c52ff" }}
          >
            LOGIN
          </button>
        </div>
        <div className="text-center w-100">
          <p className="fs-6 fw-light">
            Don't have an account? <a href="/signup">Signup</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
