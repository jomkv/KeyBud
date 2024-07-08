import React from "react";
import { Link } from "react-router-dom";

import { Typography, TextField, Button, Stack } from "@mui/material";

function Register2() {
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
          minHeight: "500px",
          padding: {
            xs: "16px",
          },
          borderRadius: "5px",
          border: "1px solid gray",
          margin: 0,
        }}
        spacing={3}
      >
        <div>
          <Typography fontWeight={600} fontSize={32}>
            Sign up
          </Typography>
          <Typography fontWeight={500} fontSize={24}>
            to join KeyBud
          </Typography>
        </div>
        <div>
          <Typography fontWeight={400} fontSize={16}>
            Username
          </Typography>
          <TextField fullWidth />
          <Typography fontWeight={400} fontSize={16}>
            Email
          </Typography>
          <TextField fullWidth />
          <Typography fontWeight={400} fontSize={16}>
            Password
          </Typography>
          <TextField fullWidth />
          <Typography fontWeight={400} fontSize={16}>
            Confirm Password
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
            Already have an account?
          </Typography>
          {/* TODO: Remove onClick style */}
          <Link to="http://localhost:3000/login">
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
          Sign up
        </Button>
      </Stack>
    </div>
  );
}

export default Register2;
