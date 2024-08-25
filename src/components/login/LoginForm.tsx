import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import Spinner from "../Spinner";
import { useLoginMutation } from "../../state/slices/usersApiSlice";
import { setCredentials } from "../../state/slices/authSlice";
import { AppDispatch, RootState } from "../../state/store";

const schema = z.object({
  usernameOrEmail: z.string().nonempty("This field is required"),
  password: z.string().nonempty("Password is required"),
});

interface IForm {
  usernameOrEmail: string;
  password: string;
}

function LoginForm() {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const [login, { isLoading, isSuccess }] = useLoginMutation();

  const dispatch = useDispatch<AppDispatch>();
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
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
  }, [isSuccess, navigate]);

  const onSubmit = async (data: IForm) => {
    try {
      const res: any = await login(data).unwrap();
      dispatch(setCredentials({ ...res.user }));
      navigate("/");
      toast.success("Login successful");
    } catch (error: any) {
      toast.warn(error.data.message || "An error occurred");
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
          disabled={isLoading}
        >
          {isLoading ? <Spinner /> : "SUBMIT"}
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
