import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function CreatePostWidget() {
  const navigate = useNavigate();

  const handleClick = () => {
    return navigate("/create-post");
  };

  return (
    <Button
      className="position-absolute bottom-0 ms-3 mb-2 rounded-circle"
      style={{
        color: "white",
        width: "70px",
        height: "70px",
      }}
      onClick={handleClick}
    >
      <i className="bi bi-plus fs-1 fw-bold"></i>
    </Button>
  );
}

export default CreatePostWidget;
