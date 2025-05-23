// * 3rd Party Impoorts
import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";

// * Local Imports
import NavbarComponent from "../components/NavbarComponent";
import Posts from "../components/profile/Posts";
import Likes from "../components/profile/Likes";
import definedOrRedirect from "../utils/definedOrRedirect";
import { useGetProfileQuery } from "../state/slices/usersApiSlice";
import { useUserContext } from "../context/UserContext";

function Profile() {
  const [tab, setTab] = useState<string>("posts");
  const [isEditHover, setIsEditHover] = useState<boolean>(false);

  const { id } = useParams();
  const navigate = useNavigate();

  definedOrRedirect(id);

  const { data: profileData, isLoading, isError } = useGetProfileQuery(id);
  const { user } = useUserContext();

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, navigate]);

  const handleEdit = () => {
    navigate("/edit-profile");
  };

  return (
    <div className="bg-light">
      <NavbarComponent />

      <Container className="mb-3 mt-3">
        <Row>
          <Col xs={12} md={12} lg={5}>
            <div
              className="bg-secondary d-flex align-items-center p-4 rounded-3"
              style={{
                color: "white",
              }}
            >
              <div className="d-flex align-items-center">
                {isLoading ? (
                  <Skeleton
                    circle={true}
                    className="me-3"
                    style={{
                      height: "5rem",
                      width: "5rem",
                    }}
                  />
                ) : (
                  <img
                    src={profileData?.user.icon || "/images/user_icon.png"}
                    className="rounded-circle me-3"
                    style={{
                      height: "5rem",
                      width: "5rem",
                      objectFit: "cover",
                    }}
                    alt="Icon"
                  />
                )}
              </div>
              <Row xs={1} sm={1}>
                <Col>
                  <p className="fs-3 fw-bold m-0">
                    {isLoading ? (
                      <Skeleton width={100} />
                    ) : (
                      profileData?.user.username
                    )}
                  </p>
                </Col>
                <Col>
                  <p className="fs-5">
                    {isLoading ? (
                      <Skeleton width={100} />
                    ) : (
                      profileData?.user.switchType || "Tactile"
                    )}
                  </p>
                </Col>
              </Row>
              {user?._id === profileData?.user._id && (
                <div className="w-100 d-flex justify-content-end">
                  <Button
                    style={{
                      backgroundColor: "transparent",
                      borderColor: "transparent",
                    }}
                    onMouseOver={() => setIsEditHover(true)}
                    onMouseLeave={() => setIsEditHover(false)}
                    onClick={handleEdit}
                  >
                    <i
                      className={`bi bi-pencil${isEditHover ? "-fill" : ""} h2`}
                      style={{
                        color: "#8c52ff",
                      }}
                    />
                  </Button>
                </div>
              )}
            </div>
          </Col>
          <Col xs={0} md={0} lg={2}></Col>
          <Col
            xs={12}
            md={12}
            lg={5}
            className="d-flex justify-content-center justify-content-lg-end align-items-end"
          >
            <Row xs={2} sm={2} className="mt-2">
              <Col>
                {tab === "posts" ? (
                  <Button
                    className="fs-3 rounded-5 p-4 pt-2 pb-2 bg-secondary"
                    style={{
                      color: "white",
                      borderColor: "white",
                      whiteSpace: "nowrap",
                    }}
                    onClick={() => {
                      setTab("posts");
                    }}
                  >
                    Posts {profileData && `(${profileData.posts.length})`}
                  </Button>
                ) : (
                  <Button
                    className="fs-3 rounded-5 p-4 pt-2 pb-2"
                    style={{
                      backgroundColor: "transparent",
                      borderColor: "transparent",
                      whiteSpace: "nowrap",
                    }}
                    onClick={() => {
                      setTab("posts");
                    }}
                  >
                    Posts {profileData && `(${profileData.posts.length})`}
                  </Button>
                )}
              </Col>
              <Col>
                {tab === "likes" ? (
                  <Button
                    className="fs-3 rounded-5 p-4 pt-2 pb-2 bg-secondary"
                    style={{
                      color: "white",
                      borderColor: "white",
                      whiteSpace: "nowrap",
                    }}
                    onClick={() => {
                      setTab("likes");
                    }}
                  >
                    Likes {profileData && `(${profileData.likes.length})`}
                  </Button>
                ) : (
                  <Button
                    className="fs-3 rounded-5 p-4 pt-2 pb-2"
                    style={{
                      backgroundColor: "transparent",
                      borderColor: "transparent",
                      whiteSpace: "nowrap",
                    }}
                    onClick={() => {
                      setTab("likes");
                    }}
                  >
                    Likes {profileData && `(${profileData.likes.length})`}
                  </Button>
                )}
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="justify-content-center mt-3">
          {profileData && tab === "posts" && (
            <Posts isLoading={isLoading} posts={profileData.posts} />
          )}
          {profileData && tab === "likes" && (
            <Likes isLoading={isLoading} likes={profileData.likes} />
          )}
        </Row>
      </Container>
    </div>
  );
}

export default Profile;
