import { Button, Container, Form } from "react-bootstrap";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import NavbarComponent from "../components/NavbarComponent";
import { useUserContext } from "../context/UserContext";
import { getCooldownInDays, isWithinPast30Days } from "../utils/dateHelpers";
import { useEditProfileMutation } from "../state/slices/usersApiSlice";
import Spinner from "../components/Spinner";

const schema = z.object({
  username: z
    .string()
    .min(1, "Username is required")
    .max(150, "Username is too long"),
  switchType: z.string().min(1, "Switch Type is required"),
  icon: z.any(),
});

interface IForm {
  username: string;
  switchType: string;
  icon: File;
}

function EditProfile() {
  const { user, setUser } = useUserContext();
  const [isUsernameCooldown, setIsUsernameCooldown] = useState<boolean>(false);
  const [editProfile, { isLoading: isSubmitting }] = useEditProfileMutation();
  const navigate = useNavigate();

  const form = useForm<IForm>({
    defaultValues: {
      username: "",
      switchType: "",
      icon: undefined,
    },
    resolver: zodResolver(schema),
  });

  const { register, handleSubmit, formState, setValue } = form;
  const { errors } = formState;

  useEffect(() => {
    if (user) {
      setValue("username", user.username || "");
      setValue("switchType", user.switchType || "");

      if (user.usernameEditedAt && isWithinPast30Days(user.usernameEditedAt)) {
        setIsUsernameCooldown(true);
      }
    }
  }, [user]);

  const onSubmit = async (formData: IForm) => {
    try {
      const user = await editProfile(formData).unwrap();

      if (setUser) setUser(user);
      toast.success("Profile updated");
      navigate("/");
    } catch (error) {
      navigate("/");
      toast.warn("Something went wrong, please try again later");
    }
  };

  return (
    <div className="bg-light">
      <NavbarComponent />

      <Container
        className="h-100"
        style={{
          color: "white",
        }}
      >
        <Form
          className="bg-secondary p-4 mt-3 mb-3 rounded-3"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <p className="fs-2 fw-bold">Edit Profile</p>
          <Form.Group className="mb-3">
            <Form.Label className="fs-5 fw-medium">Username</Form.Label>
            <Form.Control
              className="fs-5"
              type="text"
              // onChange={titleHandleChange}
              {...register("username")}
              isInvalid={errors.username?.message ? true : false}
              readOnly={isUsernameCooldown}
            />
            <Form.Control.Feedback type="invalid">
              {errors.username?.message}
            </Form.Control.Feedback>
            {isUsernameCooldown && user?.usernameEditedAt && (
              <Form.Text
                style={{
                  color: "white",
                }}
              >
                You can change your username in{" "}
                {getCooldownInDays(user?.usernameEditedAt)} days.
              </Form.Text>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="fs-5 fw-medium">Switch Type</Form.Label>
            <Form.Select
              {...register("switchType")}
              isInvalid={errors.switchType?.message ? true : false}
            >
              <option>Choose a switch type</option>
              <option value="Linear">Linear</option>
              <option value="Tactile">Tactile</option>
              <option value="Clicky">Clicky</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.switchType?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group
            controlId="formFile"
            className="mb-3"
            {...register("icon")}
          >
            <Form.Label className="fs-5 fw-medium">Icon</Form.Label>
            <Form.Control type="file" />
            <Form.Control.Feedback type="invalid">
              {errors.icon?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <div className="w-100 d-flex justify-content-end pe-1">
            <Button
              variant="primary"
              className="mt-3 p-4 pt-3 pb-3 fs-5 fw-semibold"
              type="submit"
              style={{
                color: "white",
                width: "14rem",
              }}
              disabled={isSubmitting}
            >
              {isSubmitting ? <Spinner /> : "Apply Changes"}
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
}

export default EditProfile;
