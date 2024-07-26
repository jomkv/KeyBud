import LoginForm from "../components/login/LoginForm";

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
      <LoginForm />
    </div>
  );
}

export default Login;
