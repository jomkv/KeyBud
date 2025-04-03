import { Col, Row } from "react-bootstrap";
import { IUser } from "../../@types/userType";
import { useNavigate } from "react-router-dom";

interface ICardHeaderProps {
  user: IUser;
}

const UserCard: React.FC<ICardHeaderProps> = ({ user }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/profile/${user._id}`);
  };

  return (
    <div
      className="bg-secondary d-flex align-items-center p-4 rounded-3"
      style={{
        color: "white",
        cursor: "pointer",
      }}
      onClick={handleClick}
    >
      <div className="d-flex align-items-center">
        <img
          src={user.icon || "/images/user_icon.png"}
          className="rounded-circle me-3"
          style={{
            width: "5rem",
          }}
          alt="Icon"
        />
      </div>
      <Row xs={1} sm={1}>
        <Col>
          <p className="fs-3 fw-bold m-0">{user.username}</p>
        </Col>
        <Col>
          <p className="fs-5">{user.switchType || "Tactile"}</p>
        </Col>
      </Row>
    </div>
  );
};

export default UserCard;
