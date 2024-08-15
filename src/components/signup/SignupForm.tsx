import { Button, Form, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import GoogleSignupButton from "./GoogleSignupButton";
import { useDispatch, useSelector } from "react-redux";
import { registerAsync } from "../../state/user/userSlice";
import { AppDispatch, RootState } from "../../state/store";
import { useState } from "react";
import { IUserState } from "../../@types/userType";

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
}

function SignupForm() {
  const userState: IUserState = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  const form = useForm<IForm>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirm: "",
    },
    resolver: zodResolver(schema),
  });

  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const onSubmit = (data: IForm) => {
    dispatch(registerAsync(data));
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
            disabled={userState.loading}
          >
            {userState.loading ? <Spinner /> : "SIGNUP"}
          </Button>
        </Form.Group>

        <div className="text-center w-100">
          <p className="fs-6 fw-light">
            Already have an account? <a href="/login">Login</a>
          </p>
        </div>

        <GoogleSignupButton disabled={userState.loading} />
      </Form>
    </>
  );
}

export default SignupForm;
