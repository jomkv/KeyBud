import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function CreatePostWidget() {
  const navigate = useNavigate();

  const handleClick = () => {
    return navigate("/create-post");
  };

  return (
    <Button
      className="position-absolute bottom-0 p-0 ms-3 mb-2 rounded-circle"
      style={{
        color: "white",
        height: "80px",
        width: "80px",
      }}
      onClick={handleClick}
    >
      <i className="bi bi-plus fs-1"></i>
    </Button>
  );
}

export default CreatePostWidget;
