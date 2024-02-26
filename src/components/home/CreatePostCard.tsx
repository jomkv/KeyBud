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
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import styled from "@emotion/styled";

const KeybudIconButton = styled(IconButton)({
  color: "#8C52FF",
  borderColor: "#8C52FF",
  ":hover": {
    borderColor: "#8C52FF",
  },
});

const KeybudButton = styled(Button)({
  color: "rgba(31, 31, 31, 1)",
  borderColor: "#8C52FF",
  fontWeight: "bold",
  backgroundColor: "#8C52FF",
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

function CreatePostCard() {
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
        width: "100%",
      }}
    >
      <CardHeader
        avatar={<Avatar src="/images/user_icon.png" />}
        title={
          <KeybudTextbox
            placeholder="Title"
            InputProps={{
              sx: {
                color: "white",
                fontSize: 24,
              },
            }}
            fullWidth
            variant="filled"
          />
        }
      />
      <CardContent>
        <TextField
          placeholder="Description"
          InputProps={{
            sx: {
              color: "white",
              fontSize: 24,
            },
          }}
          multiline
          rows={4}
          fullWidth
          variant="filled"
        />
      </CardContent>
      <CardActions disableSpacing>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            paddingLeft: 1,
            paddingRight: 1,
            alignItems: "center",
          }}
        >
          <KeybudIconButton size="large" sx={{ color: "#8C52FF" }}>
            <AddPhotoAlternateIcon fontSize="large" />
          </KeybudIconButton>
          <KeybudButton
            variant="contained"
            sx={{ fontSize: 16, fontWeight: 700 }}
          >
            Post
          </KeybudButton>
        </Box>
      </CardActions>
    </Card>
  );
}

export default CreatePostCard;
