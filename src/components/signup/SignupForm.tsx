import { Button, Form, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ProgressBar } from "react-bootstrap";

import {
  useRegisterMutation,
  useResendMutation,
  useVerifyMutation,
} from "../../state/slices/authApiSlice";
import { useUserContext } from "../../context/UserContext";
import GoogleSignupButton from "./GoogleSignupButton";

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
    verificationCode: z
      .string()
      .length(6, "Verification code must be 6 characters"),
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
  verificationCode: string;
}

function SignupForm() {
  const { user } = useUserContext();
  const [registerMutation, { isLoading: isSubmitting }] = useRegisterMutation();
  const [verifyMutation, { isLoading: isVerifying }] = useVerifyMutation();
  const [resendCode, { isLoading: isResending }] = useResendMutation();
  const [cooldown, setCooldown] = useState(0);

  const navigate = useNavigate();

  /**
   * Step 1: Fill-up form (email, username, etc...)
   * Step 2: Provide verification code from email
   */
  const [step, setStep] = useState<number>(1);

  const form = useForm<IForm>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirm: "",
      switchType: "",
      verificationCode: "",
    },
    resolver: zodResolver(schema),
  });

  const { register, handleSubmit, formState, getValues, setValue, watch } =
    form;
  const { errors } = formState;

  const verificationCode = watch("verificationCode", ""); // Default to an empty string

  const onProceed = async () => {
    const isValid = await form.trigger([
      "username",
      "email",
      "password",
      "confirm",
      "switchType",
    ]);

    if (!isValid) {
      return;
    }

    try {
      await verifyMutation({
        username: getValues("username"),
        email: getValues("email"),
        verificationCode: getValues("verificationCode"),
      }).unwrap();
      setStep(2); // Proceed to the next step if validation passes
    } catch (error: any) {
      toast.warn(
        error?.data?.message || "Failed to signup, please try again later."
      );
    }
  };

  const handleVerificationCodeChange = (index: number, value: string) => {
    const currentCode = getValues("verificationCode").split("");
    currentCode[index] = value.slice(-1).toUpperCase(); // Only take the last character
    setValue("verificationCode", currentCode.join(""));

    // Automatically move to the next input
    if (value && index < 5) {
      const nextInput = document.getElementById(
        `verificationCode-${index + 1}`
      );
      if (nextInput) (nextInput as HTMLInputElement).focus();
    }
  };

  const handleVerificationCodeKeyDown = (
    index: number,
    event: React.KeyboardEvent
  ) => {
    if (
      event.key === "Backspace" &&
      index > 0 &&
      !getValues("verificationCode")[index]
    ) {
      const prevInput = document.getElementById(
        `verificationCode-${index - 1}`
      );
      if (prevInput) (prevInput as HTMLInputElement).focus();
    }
  };

  const onSubmit = async (data: IForm) => {
    try {
      await registerMutation(data).unwrap();
      navigate("/login");
      toast.success("Signup successful.");
    } catch (error: any) {
      setValue("verificationCode", "");
      toast.warn(
        error?.data?.message || "Failed to signup, please try again later."
      );
    }
  };

  const handleResendCode = async () => {
    try {
      await resendCode({ email: getValues("email") }).unwrap();
      setCooldown(60); // Start the 60-second cooldown
    } catch (error) {
      toast.warn("Something went wrong, please try again later.");
    }
  };

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setInterval(() => {
        setCooldown((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer); // Cleanup the timer
    }
  }, [cooldown]);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [navigate, user]);

  return (
    <Form
      className="p-5 pt-4 pb-4 m-5 m-lg-0 rounded bg-light"
      style={{
        color: "#1f1f1f",
        width: "25rem",
        maxHeight: "100vh",
        overflow: "auto",
      }}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <ProgressBar now={step * 50} variant="primary" className="mb-3" />
      {step === 1 && (
        <>
          <p className="fs-3 fw-bold mb-1">Signup</p>

          <Form.Group className="mb-2">
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

          <Form.Group className="mb-2">
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

          <Form.Group className="mb-2">
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

          <Form.Group className="mb-2">
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

          <Form.Group className="mb-2">
            <Button
              variant="primary"
              className="btn btn-primary w-100 p-3 fw-bold"
              style={{ color: "white" }}
              type="button"
              onClick={onProceed}
              disabled={isVerifying}
            >
              {isVerifying ? <Spinner /> : "SUBMIT"}
            </Button>
          </Form.Group>

          <div className=" w-100">
            <p className="fs-6 fw-light">
              Already have an account? <a href="/login">Login</a>
            </p>
          </div>

          <h5
            style={{
              width: "100%",
              textAlign: "center",
              borderBottom: "1px solid #000",
              lineHeight: "0.1em",
              margin: "30px 0",
            }}
          >
            <span
              style={{
                padding: "0 10px",
                backgroundColor: "#d0ccc4",
              }}
            >
              OR
            </span>
          </h5>

          {/* <div className="text-center w-100 mt-4 mb-0">
            <hr className="w-100" />
            <span
              className="position-relative fw-bold"
              style={{
                top: "-30px",
                background: "#d1cdc4",
                padding: "0 10px",
              }}
            >
              OR
            </span>
          </div> */}

          <GoogleSignupButton />
        </>
      )}

      {step === 2 && (
        <>
          <p className="fs-2 fw-bold mb-0">Authentication</p>
          <p className="fs-6">
            Please enter the code we emailed you{" "}
            <span className="fw-bold">{getValues("email")}</span>
          </p>

          <Form.Group className="mb-4 mt-4">
            <div
              className="d-flex w-100 justify-content-between"
              onPaste={(e) => {
                e.preventDefault();
                const pasteData = e.clipboardData.getData("text").slice(0, 6); // Get up to 6 characters from the clipboard
                const currentCode = pasteData
                  .split("")
                  .map((char) => char.toUpperCase());
                setValue("verificationCode", currentCode.join(""));

                // Automatically populate the input boxes
                currentCode.forEach((char, index) => {
                  const input = document.getElementById(
                    `verificationCode-${index}`
                  );
                  if (input) (input as HTMLInputElement).value = char;
                });
              }}
            >
              {Array(6)
                .fill(0)
                .map((_, index) => (
                  <Form.Control
                    key={index}
                    id={`verificationCode-${index}`}
                    type="text"
                    maxLength={1}
                    className="text-center"
                    style={{
                      width: "100%",
                      maxWidth: "3rem",
                      height: "3.3rem",
                      fontSize: "1.5rem",
                      borderColor: errors.verificationCode ? "red" : undefined,
                    }}
                    value={verificationCode[index] || ""}
                    onChange={(e) =>
                      handleVerificationCodeChange(index, e.target.value)
                    }
                    onKeyDown={(e) => handleVerificationCodeKeyDown(index, e)}
                  />
                ))}
            </div>
            <Form.Control.Feedback type="invalid">
              {errors.verificationCode?.message}
            </Form.Control.Feedback>
            <Form.Text id="passwordHelpBlock" muted>
              {isResending ? (
                <div
                  className="d-flex align-items-center"
                  style={{
                    marginTop: "0.25rem",
                  }}
                >
                  <Spinner
                    animation="border"
                    size="sm"
                    role="status"
                    className="me-2"
                    style={{ color: "#007bff" }}
                  />
                  <span>Resending code...</span>
                </div>
              ) : cooldown > 0 ? (
                <span>Resend code in {cooldown} seconds</span>
              ) : (
                <>
                  Didn't get the code? Check your spam folder or{" "}
                  <button
                    type="button"
                    className="btn btn-link p-0"
                    style={{
                      textDecoration: "underline",
                      color: "#007bff",
                    }}
                    onClick={handleResendCode}
                  >
                    Resend code
                  </button>
                </>
              )}
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Button
              variant="primary"
              className="btn btn-primary w-100 p-3 fw-bold"
              style={{ color: "white" }}
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? <Spinner /> : "SUBMIT"}
            </Button>
          </Form.Group>
        </>
      )}
    </Form>
  );
}

export default SignupForm;
