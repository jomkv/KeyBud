import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

interface IForm {
  username: string;
  email: string;
  password: string;
  confirm: string;
}

function SignupForm() {
  const form = useForm<IForm>();
  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;

  const onSubmit = (data: IForm) => {
    console.log("Form submitted", data);
  };

  return (
    <>
      <Form
        className="p-5 rounded bg-light"
        style={{
          color: "#1f1f1f",
          width: "450px",
        }}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <p className="fs-1 fw-bold">Signup</p>

        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            id="username"
            isInvalid={errors.username?.message ? true : false}
            {...register("username", {
              required: { value: true, message: "Username is required" },
              minLength: {
                value: 5,
                message: "Username too short",
              },
              maxLength: {
                value: 50,
                message: "Username too long",
              },
            })}
          />
          <Form.Control.Feedback type="invalid">
            {errors.username?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            id="email"
            isInvalid={errors.email?.message ? true : false}
            {...register("email", {
              pattern: {
                value: /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
                message: "Please provide a valid email",
              },
              required: {
                value: true,
                message: "Email is required",
              },
            })}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            id="password"
            isInvalid={errors.password?.message ? true : false}
            {...register("password", {
              required: { value: true, message: "Password is required" },
              minLength: {
                value: 8,
                message: "Password too short",
              },
            })}
          />
          <Form.Control.Feedback type="invalid">
            {errors.password?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            id="confirm"
            isInvalid={errors.confirm?.message ? true : false}
            {...register("confirm", {
              validate: (fieldValue) => {
                return (
                  fieldValue === form.getValues().password ||
                  "Passwords do not match"
                );
              },
            })}
          />
          <Form.Control.Feedback type="invalid">
            {errors.confirm?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Button
            variant="primary"
            className="btn btn-primary w-100 p-3 fw-bold"
            style={{ color: "white" }}
            type="submit"
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
      <DevTool control={control} />
    </>
  );
}

export default SignupForm;
