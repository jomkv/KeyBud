import { Card } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";

interface ICardProps {
  isPostPage?: boolean;
}

const CardSkeleton: React.FC<ICardProps> = ({ isPostPage }) => {
  return (
    <Card
      className="bg-secondary pb-5"
      style={{
        color: "white",
      }}
    >
      <Card.Header className="pt-3">
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <Skeleton circle={true} height={25} width={25} />
            <Skeleton style={{ marginLeft: "7px" }} width={100} />
          </div>
        </div>

        <Card.Title
          className="fs-2 mt-3 p-2 pb-0"
          style={{
            color: "white",
          }}
        >
          <Skeleton />
        </Card.Title>
      </Card.Header>
      <Card.Body className="pt-0 pb-0">
        {isPostPage && (
          <Card.Text className="p-2 pt-0">
            <Skeleton count={3} />
          </Card.Text>
        )}
      </Card.Body>
    </Card>
  );
};

export default CardSkeleton;
