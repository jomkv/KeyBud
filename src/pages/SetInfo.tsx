import { Button, Container, Form } from "react-bootstrap";
import NavbarComponent from "../components/NavbarComponent";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUserContext } from "../context/UserContext";
import { useEffect, useRef, useState } from "react";
import { useEditProfileMutation } from "../state/slices/usersApiSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";

const schema = z.object({
  username: z
    .string()
    .min(1, "Username is required")
    .max(150, "Username is too long")
    .regex(/^\S*$/, "Username should not contain spaces"),
  switchType: z.string().min(1, "Switch Type is required"),
});

interface IForm {
  username: string;
  switchType: string;
  icon: File;
}

function SetInfo() {
  const { user, setUser } = useUserContext();
  const [editProfile, { isLoading: isSubmitting }] = useEditProfileMutation();
  const navigate = useNavigate();
  const [imageError, setImageError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [icon, setIcon] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<IForm>({
    defaultValues: {
      username: "",
      switchType: "",
      icon: undefined,
    },
    resolver: zodResolver(schema),
  });

  const { register, handleSubmit, formState, setValue, setError } = form;
  const { errors } = formState;

  useEffect(() => {
    if (user && user.username && user.switchType) {
      navigate("/");
    }

    if (user) {
      if (user.username) setValue("username", user.username);
      if (user.switchType) setValue("switchType", user.switchType);
    }
  }, [user]);

  const onSubmit = async (formData: IForm) => {
    setIsSubmitted(true);

    if (!icon) {
      return;
    }

    const data = new FormData();
    data.append("username", formData.username);
    data.append("switchType", formData.switchType);
    data.append("icon", icon);

    try {
      const user = await editProfile(data).unwrap();

      if (setUser) setUser(user);
      toast.success("Information set.");
      navigate("/");
    } catch (error: any) {
      if (error?.data?.message?.toLowerCase().includes("username")) {
        setError("username", { message: error.data.message });
      } else {
        toast.warn("Something went wrong, please try again later.");
      }
    }
  };

  const selectFiles = () => {
    fileInputRef.current?.click();
  };

  const updateImages = (files: FileList | null) => {
    if (!files) {
      toast.warn("Something went wrong, please try again.");
      return;
    }

    if (files.length > 1) {
      toast.warn("You can only upload a maximum of 1 image.");
      return;
    }

    const file: File = files[0];

    // check if file is an image
    if (file.type.split("/")[0] !== "image") {
      toast.warn("A non-image file was selected.");
      return;
    }

    // if file size too big
    if (file.size > 10485760) {
      toast.warn("File size too large, maximum is 10MB.");
      return;
    }

    setIcon(file);
  };

  const getImageFile = async (url: string) => {
    const fileName = url.split("/").slice(-1)[0].split(".")[0];
    const fileExt = url.split("/").slice(-1)[0].split(".")[1];

    const response = await fetch(url);
    const blob = await response.blob();
    const file = new File([blob], fileName + fileExt, {
      type: blob.type,
    });

    return file;
  };

  const onFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    updateImages(files);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
    event.dataTransfer.dropEffect = "copy";
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const files = event.dataTransfer.files;

    updateImages(files);
  };

  const handleUploadDelete = () => {
    setIcon(null);
  };

  useEffect(() => {
    if (!icon) {
      setImageError("Please upload an image");
    } else {
      setImageError(null);
    }
  }, [icon]);

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
          <p className="fs-2 fw-bold">Set Information</p>
          <Form.Group className="mb-3">
            <Form.Label className="fs-5 fw-medium">Username</Form.Label>
            <Form.Control
              className="fs-5"
              type="text"
              // onChange={titleHandleChange}
              {...register("username")}
              isInvalid={errors.username?.message ? true : false}
            />
            <Form.Control.Feedback type="invalid">
              {errors.username?.message}
            </Form.Control.Feedback>
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
          <Form.Group className="mb-3">
            <Form.Label className="fs-5 fw-medium">Icon</Form.Label>
            <div
              className={`w-100 pt-5 pb-5 rounded d-flex flex-column align-items-center justify-content-center fs-4 ${
                icon ? "d-none" : ""
              }`}
              style={{
                border: "4px dashed white",
              }}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {isDragging ? (
                <p className="m-4">Drop images here</p>
              ) : (
                <>
                  <p className="m-4">
                    Drag and drop image here or{" "}
                    <span
                      role="button"
                      style={{
                        color: "blue",
                      }}
                      onClick={selectFiles}
                    >
                      browse
                    </span>
                  </p>
                  <Form.Control
                    {...register("icon")}
                    type="file"
                    ref={fileInputRef}
                    onChange={onFileSelect}
                    hidden
                    isInvalid={isSubmitted && imageError !== null}
                    aria-describedby="icon-feedback"
                  />
                </>
              )}
            </div>
            {isSubmitted && imageError && (
              <p className="text-danger fs-5">{imageError}</p>
            )}

            <div className="d-flex mt-3" style={{ columnGap: "10px" }}>
              {icon && (
                <div
                  style={{
                    height: "6rem",
                    width: "6rem",
                    position: "relative",
                  }}
                >
                  <img
                    src={URL.createObjectURL(icon)}
                    alt="icon"
                    className="w-100 h-100 rounded"
                  />
                  <span
                    className="bg-danger"
                    style={{
                      position: "absolute",
                      height: "1.5rem",
                      width: "1.5rem",
                      top: 0,
                      right: 0,
                      marginRight: "0.2rem",
                      marginTop: "0.2rem",
                      padding: "0rem 0.34rem",
                      cursor: "pointer",
                      borderRadius: "50%",
                      color: "white",
                    }}
                    onClick={() => handleUploadDelete()}
                  >
                    &times;
                  </span>
                </div>
              )}
            </div>
          </Form.Group>
          <div className="w-100 d-flex justify-content-end pe-1">
            <Button
              variant="primary"
              className="mt-3 p-4 pt-3 pb-3 fs-5 fw-semibold"
              type="submit"
              style={{
                color: "white",
                width: "9rem",
              }}
              disabled={isSubmitting}
            >
              {isSubmitting ? <Spinner /> : "Submit"}
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
}

export default SetInfo;
