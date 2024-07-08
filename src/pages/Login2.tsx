import React from "react";
import { Link } from "react-router-dom";

import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Stack,
} from "@mui/material";

function Login2() {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        background: "#e5e5e5",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack
        sx={{
          background: "white",
          minWidth: {
            xs: "250px",
            md: "300px",
            lg: "350px",
          },
          minHeight: "350px",
          padding: "20px",
          borderRadius: "5px",
          border: "1px solid gray",
          margin: 0,
        }}
        spacing={3}
      >
        <div>
          <Typography fontWeight={600} fontSize={32}>
            Log in
          </Typography>
          <Typography fontWeight={500} fontSize={24}>
            to enter KeyBud
          </Typography>
        </div>
        <div>
          <Typography fontWeight={400} fontSize={16}>
            Username / Email
          </Typography>
          <TextField fullWidth />
          <Typography fontWeight={400} fontSize={16}>
            Password
          </Typography>
          <TextField fullWidth />
        </div>
        <div style={{ display: "flex" }}>
          <Typography
            fontWeight={400}
            fontSize={{
              xs: 13,
              md: 14,
              lg: 15,
            }}
            mr={0.5}
          >
            Dont have an account yet?
          </Typography>
          {/* TODO: Remove onClick style */}
          <Link to="http://localhost:3000/signup">
            <Typography
              fontWeight={400}
              fontSize={{
                xs: 13,
                md: 14,
                lg: 15,
              }}
            >
              Click here
            </Typography>
          </Link>
        </div>
        <Button
          variant="contained"
          disableElevation
          sx={{
            fontWeight: 700,
            fontSize: 16,
            fontFamily: "Plus Jakarta Sans",
          }}
        >
          Log in
        </Button>
      </Stack>
    </div>
  );
}

export default Login2;
