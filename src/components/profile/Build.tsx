import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

function Build() {
  return (
    <Col xs={12} sm={12}>
      <Card
        className="bg-secondary"
        style={{
          color: "white",
        }}
      >
        <Card.Header className="pt-3">
          <Card.Title className="fs-2 mt-2 text-center">
            Rakk Pirah Plus, Fully Modded
          </Card.Title>
        </Card.Header>
        <Card.Body className="pt-0 pb-0">
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
        <Card.Footer className="d-flex w-100 justify-content-center mt-3">
          <Card.Text className="p-2 pt-0 w-75">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veniam
            omnis corporis ab, dolor maiores soluta dolorem, nesciunt
            perferendis exercitationem ad nisi, molestias vitae tenetur sint
            sequi natus. Sed, natus asperiores.
          </Card.Text>
        </Card.Footer>
      </Card>
    </Col>
  );
}

export default Build;
