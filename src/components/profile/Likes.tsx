import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function Likes() {
  return (
    <Col md={12} sm={12}>
      <Card
        className="bg-secondary"
        style={{
          color: "white",
        }}
      >
        <Card.Header className="pt-3">
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <img
                src="/images/user_icon.png"
                alt="icon"
                className="rounded-circle me-2"
                style={{
                  height: "25px",
                }}
              />
              <p className="m-0 p-0 fs-5">Username • 2 days ago</p>
            </div>
          </div>
          <Card.Title className="fs-2 mt-3 p-2 pb-0">
            Special title treatment
          </Card.Title>
        </Card.Header>

        <Card.Body className="pt-0 pb-0">
          <Card.Text className="p-2 pt-0">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veniam
            omnis corporis ab, dolor maiores soluta dolorem, nesciunt
            perferendis exercitationem ad nisi, molestias vitae tenetur sint
            sequi natus. Sed, natus asperiores.
          </Card.Text>
          <div className="d-flex justify-content-center">
            <div className="w-50">
              <img
                src="images/keyboard_sample_pic.jpg"
                alt="content"
                className="img-fluid m-0 p-0"
              />
            </div>
          </div>
        </Card.Body>
        <Card.Footer className="d-flex">
          <Button
            style={{
              backgroundColor: "transparent",
              borderColor: "transparent",
            }}
          >
            <i
              className="bi bi-star h2"
              style={{
                color: "#8c52ff",
              }}
            ></i>
          </Button>
          <Button
            style={{
              backgroundColor: "transparent",
              borderColor: "transparent",
            }}
          >
            <i
              className="bi bi-share h2"
              style={{
                color: "#8c52ff",
              }}
            ></i>
          </Button>
        </Card.Footer>
      </Card>
    </Col>
  );
}

export default Likes;
