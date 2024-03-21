import {
  Typography,
  Stack,
  Box,
  TextField,
  Button,
  IconButton,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  CardActions,
  FormControl,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import React, { Fragment, useEffect, useState } from "react";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import styled from "@emotion/styled";
import PostsCard from "../components/home/PostsCard";
import CommentCard from "../components/post/CommentCard";

const KeybudButton = styled(Button)({
  color: "white",
  background: "#8C52FF",
  borderColor: "#8C52FF",
  ":hover": {
    borderColor: "#8C52FF",
  },
  fontWeight: "bold",
  height: "70px",
  borderRadius: "8px",
});

const KeybudIconButton = styled(IconButton)({
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

const KeybudOutlinedTextbox = styled(OutlinedInput)({
  color: "white",
  fontSize: "25px",
  border: "2px solid white",
});

function Login() {
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async () => {
    // todo
  };

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack
        component="div"
        spacing={3}
        sx={{
          backgroundColor: "rgba(31, 31, 31, 0.97)",
          color: "white",
          padding: "50px",
          borderRadius: "15px",
          display: "flex",
          alignItems: "center",
          maxWidth: "100vh",
        }}
      >
        <img
          src="/images/KeyBay Logo .svg"
          style={{ maxWidth: "auto", maxHeight: 100 }}
          alt="KeyBud Logo"
        />
        <Typography variant="h4" fontWeight="bold">
          Welcome!
        </Typography>
        <FormControl>
          <Stack spacing={4} mt={2}>
            <Controller
              name="username"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <KeybudOutlinedTextbox
                  value={value}
                  onChange={onChange}
                  error={Boolean(errors.username)}
                  placeholder="Username or Email"
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <KeybudOutlinedTextbox
                  value={value}
                  onChange={onChange}
                  error={Boolean(errors.password)}
                  placeholder="Password"
                />
              )}
            />
            <KeybudButton
              variant="contained"
              sx={{
                fontSize: "20px",
              }}
            >
              Login
            </KeybudButton>
          </Stack>
        </FormControl>
      </Stack>
    </Box>
  );
}

export default Login;
