import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";

import NavbarComponent from "../components/NavbarComponent";
import { useSearchMutation } from "../state/slices/searchApiSlice";
import CardSkeleton from "../components/post_card/CardSkeleton";
import Card from "../components/post_card/Card";

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, { data: results, isLoading, isSuccess }] = useSearchMutation();
  const [tab, setTab] = useState("posts");
  const navigate = useNavigate();

  const handleSearch = async (query: string) => {
    try {
      await search(query).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleSearch(searchParams.get("search") as string);
  }, [searchParams.get("search")]);

  useEffect(() => {
    console.log(results);
  }, [results]);

  return (
    <div className="bg-light">
      <NavbarComponent />

      <Container className="mb-3 mt-3">
        <Row>
          <Col xs={12} md={12} lg={5} className="d-flex align-items-end">
            <p className="mb-0 fs-4">Search results</p>
          </Col>
          <Col xs={0} md={0} lg={2} />
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
                    }}
                    onClick={() => {
                      setTab("posts");
                    }}
                  >
                    Posts
                  </Button>
                ) : (
                  <Button
                    className="fs-3 rounded-5 p-4 pt-2 pb-2"
                    style={{
                      backgroundColor: "transparent",
                      borderColor: "transparent",
                    }}
                    onClick={() => {
                      setTab("posts");
                    }}
                  >
                    Posts
                  </Button>
                )}
              </Col>
              <Col>
                {tab === "users" ? (
                  <Button
                    className="fs-3 rounded-5 p-4 pt-2 pb-2 bg-secondary"
                    style={{
                      color: "white",
                      borderColor: "white",
                    }}
                    onClick={() => {
                      setTab("users");
                    }}
                  >
                    Users
                  </Button>
                ) : (
                  <Button
                    className="fs-3 rounded-5 p-4 pt-2 pb-2"
                    style={{
                      backgroundColor: "transparent",
                      borderColor: "transparent",
                    }}
                    onClick={() => {
                      setTab("users");
                    }}
                  >
                    Users
                  </Button>
                )}
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="justify-content-center mt-3">
          {isLoading &&
            Array(4)
              .fill(0)
              .map((_, index) => (
                <Col key={index} md={12} sm={12} className="mb-4">
                  <CardSkeleton />
                </Col>
              ))}
          {tab === "posts" &&
            results &&
            isSuccess &&
            results.posts.map((post) => (
              <Col key={post._id} md={12} sm={12} className="mb-4">
                <Card key={post._id} post={post} imageHeight="25rem" />
              </Col>
            ))}
        </Row>
      </Container>
    </div>
  );
}

export default Search;
