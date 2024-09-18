import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function CreatePostWidget() {
  const navigate = useNavigate();

  const handleClick = () => {
    return navigate("/create-post");
  };

  const renderTooltip = (props: any) => (
    <Tooltip id="button-tooltip" {...props}>
      <p className="fs-5 m-0 pt-2 pb-2 ps-4 pe-4">Create Post</p>
    </Tooltip>
  );

  return (
    <OverlayTrigger
      placement="right"
      delay={{ show: 100, hide: 100 }}
      overlay={renderTooltip}
    >
      <Button
        className="position-absolute bottom-0 p-0 ms-3 mb-2 rounded-circle"
        style={{
          color: "white",
          height: "5rem",
          width: "5rem",
        }}
        onClick={handleClick}
      >
        <i className="bi bi-plus fs-1" />
      </Button>
    </OverlayTrigger>
  );
}

export default CreatePostWidget;
