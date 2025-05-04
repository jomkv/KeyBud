import { Spinner } from "react-bootstrap";

function FullscreenSpinner() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1050, // Ensure it appears above other elements
      }}
    >
      <Spinner
        animation="border"
        role="status"
        style={{
          width: "5rem",
          height: "5rem",
          color: "white", // Optional: Change spinner color
        }}
      >
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
}

export default FullscreenSpinner;
