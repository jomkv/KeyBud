// * Third Party Imports
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// * Local Imports
import NavbarComponent from "../components/NavbarComponent";
import CommentCard from "../components/post/CommentCard";
import ChatWidget from "../components/ChatWidget";
import { AppDispatch, RootState } from "../state/store";
import { IUserState } from "../@types/userType";
import { getPostAsync } from "../state/post/postSlice";
import { IPostState } from "../@types/postType";
import formatDate from "../utils/formatDate";

const schema = z.object({
  comment: z.string().nonempty("Comment cannot be empty"),
});

interface IForm {
  comment: string;
}

function Post() {
  const { user }: IUserState = useSelector((state: RootState) => state.user);
  const { post, isError, isLoading }: IPostState = useSelector(
    (state: RootState) => state.post
  );

  const [isComment, setIsComment] = useState<boolean>(false);
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [readableDate, setReadableDate] = useState<string>("");

  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const form = useForm<IForm>({
    defaultValues: {
      comment: "",
    },
    resolver: zodResolver(schema),
  });

  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  useEffect(() => {
    if (id) {
      dispatch(getPostAsync(id));
    }
  }, []);

  useEffect(() => {
    if (post && user) {
      if (post.ownerId._id === user._id) {
        setIsOwner(true);
      }
    }
    if (post) {
      setReadableDate(formatDate(post.createdAt));
    }
  }, [post, user]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError]);

  const onSubmit = (data: IForm) => {
    console.log(data);
  };

  return (
    <div className="bg-light">
      <NavbarComponent />

      <Container className="mb-3">
        <Row className="justify-content-center gy-4 mt-2">
          <Col md={11} sm={11}>
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
                    <p className="m-0 p-0 fs-5">
                      {post?.ownerId.username} • {readableDate}
                    </p>
                  </div>
                </div>
                <Card.Title className="fs-2 mt-3 p-2 pb-0">
                  {post?.title}
                </Card.Title>
              </Card.Header>

              <Card.Body className="pt-0 pb-0">
                <Card.Text className="p-2 pt-0">{post?.description}</Card.Text>
                <div className="d-flex justify-content-center">
                  <div className="w-50 d-flex justify-content-center">
                    <img
                      src={post?.images[0].url}
                      alt="content"
                      className="img-fluid m-0 p-0"
                    />
                  </div>
                </div>
              </Card.Body>
              <Card.Footer
                className="d-flex"
                style={{
                  borderBottom: "1px solid #dee2e6",
                }}
              >
                {user && (
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
                )}

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
              <ListGroup className="list-group-flush">
                {user && (
                  <ListGroup.Item className="bg-secondary pb-4">
                    {isComment ? (
                      <Form onSubmit={handleSubmit(onSubmit)} noValidate>
                        <Form.Group className="mb-3">
                          <Form.Control
                            size="lg"
                            as="textarea"
                            rows={2}
                            placeholder="Write your comment"
                            id="comment"
                            {...register("comment")}
                            isInvalid={errors.comment?.message ? true : false}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.comment?.message}
                          </Form.Control.Feedback>
                        </Form.Group>
                        <div className="w-100 d-flex justify-content-end">
                          <Button
                            className="mt-3 ml-auto fs-6 fw-semibold"
                            style={{ color: "white" }}
                            type="submit"
                          >
                            Comment
                          </Button>
                        </div>
                      </Form>
                    ) : (
                      <Form.Control
                        size="lg"
                        type="text"
                        placeholder="Add a comment"
                        style={{
                          borderRadius: "25px",
                        }}
                        onFocus={() => {
                          setIsComment(true);
                        }}
                      />
                    )}
                  </ListGroup.Item>
                )}
                <CommentCard />
                <CommentCard />
                <CommentCard />
                <CommentCard />
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </Container>

      {user && <ChatWidget />}
    </div>
  );
}

export default Post;
