import React from "react";
import { Typography, Stack, Box, TextField, Fab } from "@mui/material";
import PostAddIcon from "@mui/icons-material/PostAdd";

function CreatePostButton() {
  return (
    <Fab
      size="large"
      variant="extended"
      sx={{ position: "absolute", bottom: 30, right: 30 }}
    >
      <PostAddIcon />
      <Typography variant="subtitle1" fontWeight="bold" ml={1}>
        Post
      </Typography>
    </Fab>
  );
}

export default CreatePostButton;
