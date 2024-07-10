import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function LoginForm() {
  return (
    <Form
      className="p-5 rounded"
      style={{
        backgroundColor: "#d1cdc4",
        color: "#1f1f1f",
        width: "390px",
      }}
    >
      <p className="fs-1 fw-bold">Login</p>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Username / Email</Form.Label>
        <Form.Control type="email" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Button
          variant="primary"
          type="submit"
          className="w-100 p-3 fw-bold"
          style={{
            color: "white",
          }}
        >
          SUBMIT
        </Button>
      </Form.Group>

      <div className="text-center w-100">
        <p className="fs-6 fw-light">
          Don't have an account? <a href="/signup">Signup</a>
        </p>
      </div>
    </Form>
  );
}

export default LoginForm;
