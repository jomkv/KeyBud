import {
  Typography,
  Button,
  IconButton,
  Card,
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

function CommentCard() {
  const [likeCount, setLikeCount] = useState<number>(0);
  const [commentCount, setCommentCount] = useState<number>(2);
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
  };

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
      }}
    >
      <CardHeader
        avatar={<Avatar src="/images/user_icon.png" />}
        title="Comment from Username"
        subheaderTypographyProps={{ sx: { color: "white" } }}
        action={
          <KeybudIconButton>
            <MoreVertIcon fontSize="large" />
          </KeybudIconButton>
        }
      />
      <CardContent>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur aliquam
        dolorem quas mollitia? Sit blanditiis, voluptatum, labore eos at eveniet
        tenetur dolor sint libero obcaecati, molestiae in ad fuga itaque.
      </CardContent>
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
}

export default CommentCard;
