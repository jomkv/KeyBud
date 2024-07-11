import {
  Typography,
  Stack,
  Box,
  TextField,
  Button,
  Avatar,
  Container,
} from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import styled from "@emotion/styled";
import PostCard from "../components/home/PostCard";
import CommentCard from "../components/post/CommentCard";
import { IPosts } from "../types/post";

import Api from "../common/Api";

import Navbar from "../components/NavbarComponent";

const KeybudButton = styled(Button)({
  color: "#8C52FF",
  borderColor: "#8C52FF",
  ":hover": {
    borderColor: "#8C52FF",
  },
});

const KeybudTextbox = styled(TextField)`
  &label.Mui-focused {
    color: white;
  }
  &.MuiOutlinedInput-root {
    &.Mui-focused fieldset {
      border-color: white;
    }
  }
`;

function Post() {
  const [likeCount, setLikeCount] = useState<number>(0);
  const [commentCount, setCommentCount] = useState<number>(2);
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const fetchPosts = async () => {
    const res = await Api.getPosts();
    console.log(res?.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
  };

  return (
    <Fragment>
      <Navbar />
      <Container sx={{ flexGrow: 1, paddingTop: "25px" }}>
        <Stack
          spacing={2}
          sx={{
            backgroundColor: "rgba(31, 31, 31, 0.97)",
            color: "white",
            padding: "25px",
            marginBottom: "25px",
            borderRadius: "15px",
          }}
        >
          <Stack direction="row" display="flex" alignItems="center" spacing={1}>
            <Avatar
              src="/images/user_icon.png"
              sx={{
                width: 45,
                height: 45,
              }}
            />
            <Typography variant="h6">Username</Typography>
          </Stack>
          <Typography variant="h4" fontWeight="bold">
            Title
          </Typography>
          <Box>
            <img
              src="/images/keyboard_sample_pic.jpg"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </Box>
          <Typography variant="body1">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta
            totam provident, tempora blanditiis accusantium minus dicta autem
            quas, debitis dignissimos dolorum id numquam dolores asperiores
            assumenda omnis repellat tenetur. Provident?
          </Typography>
          <Stack direction="row">
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
          </Stack>
          <KeybudTextbox
            placeholder="Add a comment"
            InputProps={{
              sx: {
                color: "white",
                fontSize: 24,
              },
            }}
            fullWidth
            variant="filled"
          />
          <CommentCard />
          <CommentCard />
          <CommentCard />
          <CommentCard />
        </Stack>
      </Container>
    </Fragment>
  );
}

export default Post;
