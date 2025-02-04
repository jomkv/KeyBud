import { Button, Form, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import { RootState } from "../../state/store";
import { useRegisterMutation } from "../../state/slices/usersApiSlice";

const schema = z
  .object({
    username: z
      .string()
      .nonempty("Username is required")
      .min(5, "Username is too short")
      .max(50, "Username is too long"),
    email: z
      .string()
      .nonempty("Email is required")
      .email("Please provide a valid email"),
    password: z
      .string()
      .nonempty("Password is required")
      .min(8, "Password is too short"),
    switchType: z.string().min(1, "Please select a switch type"),
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords must match",
    path: ["confirm"], // path of error
  });

interface IForm {
  username: string;
  email: string;
  password: string;
  confirm: string;
  switchType: string;
}

function SignupForm() {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const [registerMutation, { isLoading }] = useRegisterMutation();

  const navigate = useNavigate();

  const form = useForm<IForm>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirm: "",
      switchType: "",
    },
    resolver: zodResolver(schema),
  });

  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const onSubmit = async (data: IForm) => {
    try {
      await registerMutation(data).unwrap();
      navigate("/login");
      toast.success("Signup successful");
    } catch (error: any) {
      toast.warn(error?.data?.message || "An error occurred");
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

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
          <Form.Label>Email *</Form.Label>
          <Form.Control
            type="email"
            id="email"
            isInvalid={errors.email?.message ? true : false}
            {...register("email")}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Username *</Form.Label>
          <Form.Control
            type="text"
            id="username"
            isInvalid={errors.username?.message ? true : false}
            {...register("username")}
          />
          <Form.Control.Feedback type="invalid">
            {errors.username?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Switch Type *</Form.Label>
          <Form.Select
            {...register("switchType")}
            isInvalid={errors.switchType?.message ? true : false}
          >
            <option value="">Select</option>
            <option value="Linear">Linear</option>
            <option value="Tactile">Tactile</option>
            <option value="Clicky">Clicky</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            {errors.switchType?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password *</Form.Label>
          <Form.Control
            type="password"
            id="password"
            isInvalid={errors.password?.message ? true : false}
            {...register("password")}
          />
          <Form.Control.Feedback type="invalid">
            {errors.password?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Confirm Password *</Form.Label>
          <Form.Control
            type="password"
            id="confirm"
            isInvalid={errors.confirm?.message ? true : false}
            {...register("confirm")}
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
            {isLoading ? <Spinner /> : "SIGNUP"}
          </Button>
        </Form.Group>

        <div className="text-center w-100">
          <p className="fs-6 fw-light">
            Already have an account? <a href="/login">Login</a>
          </p>
        </div>
      </Form>
    </>
  );
}

export default SignupForm;
