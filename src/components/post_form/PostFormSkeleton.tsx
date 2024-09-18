import { Form } from "react-bootstrap";
import { PropsWithChildren } from "react";
import Skeleton from "react-loading-skeleton";

function Box({ children }: PropsWithChildren<unknown>) {
  return (
    <div
      style={{
        height: "6rem",
        width: "6rem",
        position: "relative",
      }}
    >
      {children}
    </div>
  );
}

const PostFormSkeleton = () => {
  return (
    <Form className="bg-secondary p-4 mt-5 rounded-3">
      <p className="fs-2 fw-bold">Edit post</p>
      <Form.Group className="mb-3">
        <Form.Label className="fs-5 fw-medium">Title *</Form.Label>
        <Skeleton height={40} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label className="fs-5 fw-medium">Body *</Form.Label>
        <Skeleton height={160} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label className="fs-5 fw-medium">Keyboard Images</Form.Label>
        <div
          className="w-100 pt-5 pb-5 rounded d-flex flex-column align-items-center justify-content-center fs-4"
          style={{
            border: "4px dashed white",
          }}
        >
          <p>
            Drag and drop images here or{" "}
            <span
              style={{
                color: "blue",
              }}
            >
              browse
            </span>
          </p>
        </div>

        <div className="d-flex mt-3" style={{ columnGap: "10px" }}>
          <Box>
            <Skeleton
              style={{
                width: "100%",
                height: "100%",
              }}
            />
          </Box>
          <Box>
            <Skeleton
              style={{
                width: "100%",
                height: "100%",
              }}
            />
          </Box>
        </div>
      </Form.Group>
    </Form>
  );
};

export default PostFormSkeleton;
