import { Col, Row } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";

function OptionSkeleton() {
  return (
    <Row className="gx-0 chat-container pt-2 pb-2 rounded">
      <Col md={12} lg={2} className="d-flex justify-content-center">
        <Skeleton
          circle={true}
          style={{
            width: "3.5rem",
            height: "3.5rem",
          }}
        />
      </Col>
      <Col
        md={0}
        lg={10}
        className="ps-2 d-flex flex-column justify-content-center d-none d-lg-block"
      >
        <p className="m-0 p-0 fs-5 fw-bold">
          <Skeleton
            style={{
              width: "90%",
            }}
          />
        </p>
        <p className="m-0 p-0 fw-light">
          <Skeleton
            style={{
              width: "90%",
            }}
          />
        </p>
      </Col>
    </Row>
  );
}

export default OptionSkeleton;
