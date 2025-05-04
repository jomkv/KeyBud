import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Spinner from "../Spinner";
import { useLoginMutation } from "../../state/slices/authApiSlice";
import { IUser } from "../../@types/userType";
import GoogleSigninButton from "./GoogleSigninButton";
import { useUserContext } from "../../context/UserContext";

const schema = z.object({
  usernameOrEmail: z.string().nonempty("This field is required"),
  password: z.string().nonempty("Password is required"),
});

interface IForm {
  usernameOrEmail: string;
  password: string;
}

function LoginForm() {
  const { user } = useUserContext();
  const [login, { isLoading, isSuccess }] = useLoginMutation();
  const { setUser } = useUserContext();

  const navigate = useNavigate();

  const form = useForm<IForm>({
    defaultValues: {
      usernameOrEmail: "",
      password: "",
    },
    resolver: zodResolver(schema),
  });

  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [navigate, user]);

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
  }, [isSuccess, navigate]);

  const onSubmit = async (data: IForm) => {
    try {
      const res: any = await login(data).unwrap();
      const user = res.user as IUser;

      if (setUser) setUser(user);

      if (!user.username || !user.switchType) {
        navigate("/set-info");
      } else {
        navigate("/");
      }

      toast.success("Login successful.");
    } catch (error: any) {
      toast.warn(
        error.data.message || "Failed to login, please try again later."
      );
    }
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
      <p className="fs-2 fw-bold">Login</p>

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

      <Form.Group className="mb-4">
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
          disabled={isLoading}
        >
          {isLoading ? <Spinner /> : "LOGIN"}
        </Button>
      </Form.Group>
      <div className="text-center w-100">
        <p className="fs-6 fw-light">
          Don't have an account? <a href="/signup">Signup</a>
        </p>
      </div>

      <div className="text-center w-100 mt-5 mb-1">
        <hr className="w-100" />
        <span
          className="position-relative fw-bold"
          style={{ top: "-30px", background: "#d1cdc4", padding: "0 10px" }}
        >
          OR
        </span>
      </div>

      <GoogleSigninButton />
    </Form>
  );
}

export default LoginForm;
