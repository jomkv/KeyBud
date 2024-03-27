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
import React, { Fragment, useEffect, useState } from "react";

import CreatePostButton from "../components/home/CreatePostButton";
import PostsCard from "../components/home/PostsCard";
import CreatePostCard from "../components/home/CreatePostCard";
import Navbar from "../components/Navbar";

import Api from "../common/Api";

interface IPosts {
  _id: string;
  title: string;
  description: string;
  likeCount: number;
  comments: string[];
  ownerId: {
    _id: string;
    username: string;
  };
  isEditted: boolean;
}

function Home() {
  const [posts, setPosts] = useState<IPosts[]>();

  useEffect(() => {
    const fetchPosts = async () => {
      const res: any = await Api.getPosts();
      setPosts(res.data.posts as IPosts[]);
    };

    fetchPosts();
  }, []);

  return (
    <Fragment>
      <Navbar />
      <Container sx={{ flexGrow: 1, paddingTop: "25px" }}>
        <Stack direction="column" alignItems="center" spacing="30px">
          <CreatePostCard />
          {posts?.map((post) => (
            <PostsCard post={post} />
          ))}
        </Stack>
      </Container>
    </Fragment>
  );
}

export default Home;
