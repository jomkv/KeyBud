import {
  Typography,
  Stack,
  Box,
  TextField,
  Fab,
  Button,
  IconButton,
} from "@mui/material";
import React, { Fragment } from "react";
import CreatePostButton from "../components/home/CreatePostButton";
import PostsCard from "../components/home/PostsCard";
import CreatePostCard from "../components/home/CreatePostCard";

function Home() {
  return (
    <Fragment>
      <Stack direction="column" alignItems="center" spacing="30px">
        <CreatePostCard />
        <PostsCard />
        <PostsCard />
        <PostsCard />
        <PostsCard />
      </Stack>
    </Fragment>
  );
}

export default Home;
