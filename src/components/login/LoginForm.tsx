import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import GoogleSigninButton from "./GoogleSigninButton";

const schema = z.object({
  usernameOrEmail: z.string().nonempty("This field is required"),
  password: z.string().nonempty("Password is required"),
});

interface IForm {
  usernameOrEmail: string;
  password: string;
}

function LoginForm() {
  const form = useForm<IForm>({
    defaultValues: {
      usernameOrEmail: "",
      password: "",
    },
    resolver: zodResolver(schema),
  });
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const onSubmit = (data: IForm) => {
    console.log(data);
  };

  return (
    <Form
      className="p-5 rounded"
      style={{
        backgroundColor: "#d1cdc4",
        color: "#1f1f1f",
        width: "450px",
      }}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <p className="fs-1 fw-bold">Login</p>

      <Form.Group className="mb-3">
        <Form.Label>Username / Email</Form.Label>
        <Form.Control
          type="text"
          {...register("usernameOrEmail")}
          id="usernameOrEmail"
          isInvalid={errors.usernameOrEmail?.message ? true : false}
        />
        <Form.Control.Feedback type="invalid">
          {errors.usernameOrEmail?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          {...register("password")}
          id="password"
          isInvalid={errors.password?.message ? true : false}
        />
        <Form.Control.Feedback type="invalid">
          {errors.password?.message}
        </Form.Control.Feedback>
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

      <GoogleSigninButton />
    </Form>
  );
}

export default LoginForm;
