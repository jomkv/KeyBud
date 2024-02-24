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

function Home() {
  return (
    <Fragment>
      <Stack direction="column" alignItems="center" spacing="30px">
        <PostsCard />
        <PostsCard />
        <PostsCard />
        <PostsCard />
      </Stack>
      <CreatePostButton />
    </Fragment>
  );
}

export default Home;
