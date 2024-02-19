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

function Navbar() {
  return (
    <AppBar position="static" sx={{ p: "1%", backgroundColor: "#1F1F1F" }}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="logo">
          <img
            src="/images/keyBud_Logo.png"
            style={{ width: 50, height: 50 }}
          />
        </IconButton>
        <Typography variant="h6" component="div">
          KeyBud
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
