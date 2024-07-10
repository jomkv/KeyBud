import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function SignupForm() {
  return (
    <Form
      className="p-5 rounded bg-light"
      style={{
        color: "#1f1f1f",
        width: "450px",
      }}
    >
      <p className="fs-1 fw-bold">Signup</p>

      <Form.Group className="mb-3" controlId="formUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formConfirmPass">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control type="password" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Button
          variant="primary"
          className="btn btn-primary w-100 p-3 fw-bold"
          style={{ color: "white" }}
        >
          SIGNUP
        </Button>
      </Form.Group>

      <div className="text-center w-100">
        <p className="fs-6 fw-light">
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </Form>
  );
}

export default SignupForm;
