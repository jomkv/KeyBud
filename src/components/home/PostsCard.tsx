import {
  Typography,
  Stack,
  Box,
  TextField,
  Fab,
  Button,
  IconButton,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardHeader,
  Avatar,
  CardActions,
} from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import styled from "@emotion/styled";

import { IPosts } from "../../types/post";

const KeybudButton = styled(Button)({
  color: "#8C52FF",
  borderColor: "#8C52FF",
  ":hover": {
    borderColor: "#8C52FF",
  },
});

const KeybudIconButton = styled(IconButton)({
  color: "#8C52FF",
  borderColor: "#8C52FF",
  ":hover": {
    borderColor: "#8C52FF",
  },
});

interface PostProps {
  post: IPosts;
}

const PostsCard: React.FC<PostProps> = ({ post }) => {
  const [redirectLink, setRedirectLink] = useState<string>("");
  const [likeCount, setLikeCount] = useState<number>(0);
  const [commentCount, setCommentCount] = useState<number>(2);
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
  };

  useEffect(() => {
    const postId = post._id;
    const link = `http://localhost:3000/${postId}`;

    setRedirectLink(link);
  }, []);

  return (
    <Card
      sx={{
        backgroundColor: "rgba(31, 31, 31, 0.97)",
        borderRadius: "15px",
        color: "White",
        ":hover": {
          backgroundColor: "rgba(31, 31, 31, 1)",
        },
        transition: "0.15s",
        width: "500",
      }}
    >
      <CardActionArea href={redirectLink}>
        <CardHeader
          avatar={<Avatar src="/images/user_icon.png" />}
          title="Post title"
          subheader="Username"
          subheaderTypographyProps={{ sx: { color: "white" } }}
          action={
            <KeybudIconButton>
              <MoreVertIcon fontSize="large" />
            </KeybudIconButton>
          }
        />
        <CardMedia
          component="img"
          image="/images/keyboard_sample_pic.jpg"
          sx={{
            objectFit: "contain",
            height: {
              xs: "auto",
              md: "500",
              xl: "500",
            },
          }}
        />
        <CardContent>{post.description}</CardContent>
      </CardActionArea>
      <CardActions>
        <KeybudButton
          size="large"
          sx={{ color: "#8C52FF" }}
          onClick={handleLikeClick}
        >
          {isLiked ? (
            <ThumbUpAltIcon fontSize="large" />
          ) : (
            <ThumbUpOffAltIcon fontSize="large" />
          )}
          {likeCount > 0 && (
            <Typography variant="h6" fontWeight={550} ml={1}>
              {likeCount}
            </Typography>
          )}
        </KeybudButton>
        <KeybudButton size="large" sx={{ color: "#8C52FF" }}>
          <ChatBubbleOutlineIcon fontSize="large" />
          {commentCount > 0 && (
            <Typography variant="h6" fontWeight={550} ml={1}>
              {commentCount}
            </Typography>
          )}
        </KeybudButton>
      </CardActions>
    </Card>
  );
};

export default PostsCard;
