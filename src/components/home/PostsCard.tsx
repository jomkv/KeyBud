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
import CreatePostButton from "./CreatePostButton";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import styled from "@emotion/styled";

const KeybudButton = styled(Button)({
  color: "#8C52FF",
  borderColor: "#8C52FF",
  ":hover": {
    borderColor: "#8C52FF",
  },
});

function PostsCard({}) {
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
      <CardActionArea>
        <CardHeader
          avatar={<Avatar src="/images/user_icon.png" />}
          title="Post title"
          subheader="Username"
          subheaderTypographyProps={{ sx: { color: "white" } }}
        />
        <CardMedia
          component="img"
          image="/images/keyboard_sample_pic.jpg"
          height="250"
          width="250"
        />
        <CardContent>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur
          aliquam dolorem quas mollitia? Sit blanditiis, voluptatum, labore eos
          at eveniet tenetur dolor sint libero obcaecati, molestiae in ad fuga
          itaque.
        </CardContent>
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
    // <Box
    //   sx={{
    //     display: "flex",
    //     flexDirection: "column",
    //     width: "50%",
    //     backgroundColor: "rgba(31, 31, 31, 0.97)",
    //     padding: "40px",
    //     borderRadius: "15px",
    //     color: "White",
    //     cursor: "pointer",
    //     ":hover": {
    //       backgroundColor: "rgba(31, 31, 31, 1)",
    //     },
    //     transition: "0.15s",
    //   }}
    // >
    //   <Stack direction="row" alignItems="center" mb="20px">
    //     <Box
    //       component="img"
    //       alt="User Icon"
    //       src="/images/user_icon.png"
    //       sx={{
    //         border: "2px solid white",
    //         borderRadius: "25px",
    //         marginRight: "5px",
    //       }}
    //     />
    //     <Typography variant="subtitle1">Username</Typography>
    //   </Stack>
    //   <Typography variant="h5">Post title</Typography>
    //   <Typography variant="subtitle1" color="lightgray">
    //     Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem
    //     nesciunt aliquam harum a amet nisi illum qui, obcaecati nam eaque
    //     inventore odit explicabo nostrum libero aliquid placeat impedit sit
    //     esse!
    //   </Typography>
    //   <Stack direction="row" alignItems="center" mt="20px" spacing={2}>
    //     <KeybudButton
    //       size="large"
    //       sx={{ color: "#8C52FF" }}
    //       onClick={handleLikeClick}
    //       variant="outlined"
    //     >
    //       {isLiked ? <ThumbUpAltIcon /> : <ThumbUpOffAltIcon />}
    //       <Typography
    //         variant="subtitle1"
    //         sx={{ fontWeight: "bold", ml: 1, textTransform: "none" }}
    //       >
    //         {isLiked ? "Unlike" : "Like"}
    //       </Typography>
    //     </KeybudButton>
    //     <KeybudButton variant="outlined" size="large" sx={{ color: "#8C52FF" }}>
    //       <ChatBubbleOutlineIcon />
    //       <Typography
    //         variant="subtitle1"
    //         sx={{ fontWeight: "bold", ml: 1, textTransform: "none" }}
    //       >
    //         Comment
    //       </Typography>
    //     </KeybudButton>
    //   </Stack>
    // </Box>
  );
}

export default PostsCard;
