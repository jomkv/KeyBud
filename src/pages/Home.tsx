import { Typography, Stack, Box, TextField, Fab } from "@mui/material";
import React, { Fragment } from "react";
import CreatePostButton from "../components/home/CreatePostButton";

function Home() {
  return (
    <Fragment>
      <Stack direction="column" alignItems="center">
        {/* <Box sx={{ display: "flex", flexDirection: "column", width: "50%" }}>
          <Typography variant="h5">Create a new post</Typography>
          <TextField placeholder="Title" />
          <TextField placeholder="Description" />
        </Box> */}
      </Stack>
      <CreatePostButton />
    </Fragment>
  );
}

export default Home;
