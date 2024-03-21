import {
  Typography,
  Stack,
  Box,
  TextField,
  Fab,
  Button,
  IconButton,
  Container,
} from "@mui/material";
import React, { Fragment } from "react";
import CreatePostButton from "../components/home/CreatePostButton";
import PostsCard from "../components/home/PostsCard";
import CreatePostCard from "../components/home/CreatePostCard";
import Navbar from "../components/Navbar";

function Home() {
  return (
    <Fragment>
      <Navbar />
      <Container sx={{ flexGrow: 1, paddingTop: "25px" }}>
        <Stack direction="column" alignItems="center" spacing="30px">
          <CreatePostCard />
          <PostsCard />
          <PostsCard />
          <PostsCard />
          <PostsCard />
        </Stack>
      </Container>
    </Fragment>
  );
}

export default Home;
