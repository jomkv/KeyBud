import {
  Typography,
  Stack,
  Box,
  TextField,
  Fab,
  Button,
  IconButton,
} from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import CreatePostButton from "./CreatePostButton";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

function PostsCard({}) {
  const [isLiked, setIsLiked] = useState(false);

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "50%",
        backgroundColor: "rgba(31, 31, 31, 0.97)",
        padding: "40px",
        borderRadius: "15px",
        color: "White",
        cursor: "pointer",
        ":hover": {
          backgroundColor: "rgba(31, 31, 31, 1)",
        },
        transition: "0.15s",
      }}
    >
      <Stack direction="row" alignItems="center" mb="20px">
        <Box
          component="img"
          alt="User Icon"
          src="/images/user_icon.png"
          sx={{
            border: "2px solid white",
            borderRadius: "25px",
            marginRight: "5px",
          }}
        />
        <Typography variant="subtitle1">Username</Typography>
      </Stack>
      <Typography variant="h5">Post title</Typography>
      <Typography variant="subtitle1" color="lightgray">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem
        nesciunt aliquam harum a amet nisi illum qui, obcaecati nam eaque
        inventore odit explicabo nostrum libero aliquid placeat impedit sit
        esse!
      </Typography>
      <Stack direction="row" alignItems="center" mt="20px">
        <Button
          size="large"
          sx={{ color: "#8C52FF" }}
          onClick={handleLikeClick}
        >
          {isLiked ? <ThumbUpAltIcon /> : <ThumbUpOffAltIcon />}
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: "bold", ml: 1, textTransform: "none" }}
          >
            {isLiked ? "Unlike" : "Like"}
          </Typography>
        </Button>
        <Button size="large" sx={{ color: "#8C52FF" }}>
          <ChatBubbleOutlineIcon />
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: "bold", ml: 1, textTransform: "none" }}
          >
            Comment
          </Typography>
        </Button>
      </Stack>
    </Box>
  );
}

export default PostsCard;
