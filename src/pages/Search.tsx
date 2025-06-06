import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";

import NavbarComponent from "../components/NavbarComponent";
import { useSearchMutation } from "../state/slices/searchApiSlice";
import CardSkeleton from "../components/post_card/CardSkeleton";
import Card from "../components/post_card/Card";
import UserCard from "../components/user_card/UserCard";
import NoResults from "../components/NoResults";

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, { data: results, isLoading, isSuccess }] = useSearchMutation();
  const [tab, setTab] = useState("posts");
  const navigate = useNavigate();

  const handleSearch = async (query: string) => {
    try {
      await search(query).unwrap();
    } catch (error) {
      //console.log(error);
    }
  };

  useEffect(() => {
    handleSearch(searchParams.get("search") as string);
  }, [searchParams.get("search")]);

  useEffect(() => {
    //console.log(results);
  }, [results]);

  return (
    <div className="bg-light">
      <NavbarComponent />

      <Container className="mb-3 mt-3">
        <Row>
          <Col xs={12} md={12} lg={3} className="d-flex align-items-end">
            <p className="mb-0 fs-4">Search results</p>
          </Col>
          <Col xs={0} md={0} lg={1} />
          <Col
            xs={12}
            md={12}
            lg={8}
            className="d-flex justify-content-center justify-content-lg-end align-items-end"
          >
            <Row className="mt-2">
              <Col>
                {tab === "posts" ? (
                  <Button
                    className="fs-4 rounded-5 p-4 pt-2 pb-2 bg-secondary"
                    style={{
                      color: "white",
                      borderColor: "white",
                      whiteSpace: "nowrap",
                    }}
                    onClick={() => {
                      setTab("posts");
                    }}
                  >
                    Posts{" "}
                    {results?.posts && (
                      <span className="fs-5">({results.posts.length})</span>
                    )}
                  </Button>
                ) : (
                  <Button
                    className="fs-4 rounded-5 p-4 pt-2 pb-2"
                    style={{
                      backgroundColor: "transparent",
                      borderColor: "transparent",
                      whiteSpace: "nowrap",
                    }}
                    onClick={() => {
                      setTab("posts");
                    }}
                  >
                    Posts{" "}
                    {results?.posts && (
                      <span className="fs-5">({results.posts.length})</span>
                    )}
                  </Button>
                )}
              </Col>
              <Col>
                {tab === "users" ? (
                  <Button
                    className="fs-4 rounded-5 p-4 pt-2 pb-2 bg-secondary"
                    style={{
                      color: "white",
                      borderColor: "white",
                      whiteSpace: "nowrap",
                    }}
                    onClick={() => {
                      setTab("users");
                    }}
                  >
                    Users{" "}
                    {results?.users && (
                      <span className="fs-5">({results.users.length})</span>
                    )}
                  </Button>
                ) : (
                  <Button
                    className="fs-4 rounded-5 p-4 pt-2 pb-2"
                    style={{
                      backgroundColor: "transparent",
                      borderColor: "transparent",
                      whiteSpace: "nowrap",
                    }}
                    onClick={() => {
                      setTab("users");
                    }}
                  >
                    Users{" "}
                    {results?.users && (
                      <span className="fs-5">({results.users.length})</span>
                    )}
                  </Button>
                )}
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="justify-content-center mt-3 gap-3">
          {isLoading &&
            Array(4)
              .fill(0)
              .map((_, index) => (
                <Col key={index} md={12} sm={12}>
                  <CardSkeleton />
                </Col>
              ))}
          {results && isSuccess && (
            <>
              {tab === "posts" && results.posts.length === 0 && (
                <Col xs={12} sm={12}>
                  <NoResults />
                </Col>
              )}
              {tab === "users" && results.users.length === 0 && (
                <Col xs={12} sm={12}>
                  <NoResults />
                </Col>
              )}

              {tab === "posts" &&
                results.posts.map((post) => (
                  <Col key={post._id} md={12} sm={12}>
                    <Card key={post._id} post={post} imageHeight="25rem" />
                  </Col>
                ))}

              {tab === "users" &&
                results.users.map((user) => (
                  <Col xs={12} sm={12}>
                    <UserCard user={user} />
                  </Col>
                ))}
            </>
          )}
        </Row>
      </Container>
    </div>
  );
}

export default Search;
