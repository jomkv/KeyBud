import Spinner from "../components/Spinner";
import { IPostInput } from "../@types/postType";

import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import { useEffect, useRef, useState } from "react";

const schema = z.object({
  title: z.string().nonempty("Title is required").max(150, "Title is too long"),
  description: z.string().nonempty("Body is required"),
  images: z.any().optional(),
});

interface IForm {
  title: string;
  description: string;
  images: FileList;
}

interface IDefaultValues {
  title: string;
  description: string;
  images:
    | {
        url: string;
        id: string;
      }[];
}

interface IPostFormProps {
  onSubmit: (data: FormData) => Promise<void>;
  isLoading: boolean;
  defaultValues?: IDefaultValues;
}

const PostForm: React.FC<IPostFormProps> = ({
  onSubmit,
  isLoading,
  defaultValues,
}) => {
  const [images, setImages] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<IForm>({
    defaultValues: {
      title: defaultValues?.title || "",
      description: defaultValues?.description || "",
    },
    resolver: zodResolver(schema),
  });
  const { register, handleSubmit, formState, reset } = form;
  const { errors } = formState;

  const selectFiles = () => {
    fileInputRef.current?.click();
  };

  const updateImages = (files: FileList | null) => {
    if (!files || files.length === 0) {
      return;
    }

    if (images.length + files.length > 4) {
      toast.warn("You can only upload a maximum of 4 images");
      return;
    }

    for (let i = 0; i < files.length; i++) {
      const file: File = files[i];

      // check if file is an image
      if (file.type.split("/")[0] !== "image") {
        toast.warn("A non-image file was selected");
        continue;
      }

      // if file size too big
      if (file.size > 10485760) {
        toast.warn("File size too large, maximum is 10MB");
        continue;
      }

      // if image is already uploaded
      if (images.some((e) => e.name === file.name)) {
        continue;
      }

      setImages((prev) => [...prev, file]);
    }
  };

  useEffect(() => {
    console.log(images);
  }, [images]);

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

  const handleUploadDelete = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleFormSubmit = async (data: IPostInput) => {
    let payload = new FormData();

    payload.append("title", data.title);
    payload.append("description", data.description);

    for (let i = 0; i < images.length; i++) {
      payload.append("images", images[i]);
    }

    await onSubmit(payload);

    reset();
    setImages([]);
  };

  return (
    <Form
      className="bg-secondary p-4 mt-5 rounded-3"
      noValidate
      onSubmit={handleSubmit(handleFormSubmit)}
      encType="multipart/form-data"
    >
      <p className="fs-2 fw-bold">Create post</p>
      <Form.Group className="mb-3">
        <Form.Label className="fs-5 fw-medium">Title *</Form.Label>
        <Form.Control
          className="fs-5"
          type="text"
          // onChange={titleHandleChange}
          {...register("title")}
          isInvalid={errors.title?.message ? true : false}
        />
        <Form.Control.Feedback type="invalid">
          {errors.title?.message}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label className="fs-5 fw-medium">Body *</Form.Label>
        <Form.Control
          className="fs-5"
          as="textarea"
          rows={5}
          {...register("description")}
          isInvalid={errors.description?.message ? true : false}
        />
        <Form.Control.Feedback type="invalid">
          {errors.description?.message}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label className="fs-5 fw-medium">Keyboard Images</Form.Label>
        <div
          className="w-100 pt-5 pb-5 rounded d-flex flex-column align-items-center justify-content-center fs-4"
          style={{
            border: "4px dashed white",
          }}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {isDragging ? (
            <p>Drop images here</p>
          ) : (
            <>
              <p>
                Drag and drop images here or{" "}
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
                {...register("images")}
                type="file"
                multiple
                ref={fileInputRef}
                onChange={onFileSelect}
                hidden
              />
            </>
          )}
          <Form.Control.Feedback type="invalid">
            {errors.images?.message}
          </Form.Control.Feedback>
        </div>

        <div className="d-flex mt-3" style={{ columnGap: "10px" }}>
          {images.map((image, index) => (
            <div
              key={index}
              style={{
                height: "6rem",
                width: "6rem",
                position: "relative",
              }}
            >
              <img
                src={URL.createObjectURL(image)}
                alt={`Upload #${index}`}
                className="w-100 h-100 rounded"
              />
              <span
                className="bg-primary rounded-circle"
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  marginRight: "0.9rem",
                  marginTop: "0.2rem",
                  padding: "0.2rem 0.4rem",
                  cursor: "pointer",
                }}
                onClick={() => handleUploadDelete(index)}
              >
                &times;
              </span>
            </div>
          ))}
        </div>
      </Form.Group>
      <div className="w-100 d-flex justify-content-end pe-1">
        <Button
          variant="primary"
          className="p-4 pt-3 pb-3 fs-5 fw-semibold"
          type="submit"
          style={{
            color: "white",
            width: "10rem",
          }}
          disabled={isLoading}
        >
          {isLoading ? <Spinner /> : "Submit"}
        </Button>
      </div>
    </Form>
  );
};

export default PostForm;
