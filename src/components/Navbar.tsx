import React from "react";

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Stack,
  Button,
  Icon,
} from "@mui/material";

import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import TextsmsIcon from "@mui/icons-material/Textsms";

function Navbar() {
  return (
    <AppBar
      position="relative"
      className="classes.appBar"
      elevation={0}
      sx={{
        p: "1%",
        backgroundColor: "#1F1F1F",
      }}
    >
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="logo">
          <img
            src="/images/keyBud_Logo.png"
            style={{ width: 50, height: 50 }}
            alt="KeyBud Logo"
          />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          KeyBud
        </Typography>
        <Stack direction="row" spacing={2}>
          <IconButton title="Messages">
            <TextsmsIcon fontSize="large" sx={{ color: "#8C52FF" }} />
          </IconButton>
          <IconButton title="Home">
            <HomeIcon fontSize="large" sx={{ color: "#8C52FF" }} />
          </IconButton>
          <IconButton title="Profile">
            <AccountCircleIcon fontSize="large" sx={{ color: "#8C52FF" }} />
          </IconButton>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
