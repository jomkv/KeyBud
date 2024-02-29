import React, { useState } from "react";

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Stack,
  Button,
  Icon,
  Badge,
  Avatar,
  Menu,
  MenuItem,
  SvgIcon,
} from "@mui/material";

import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import TextsmsIcon from "@mui/icons-material/Textsms";
import MenuIcon from "@mui/icons-material/Menu";
import styled from "@emotion/styled";

const StyledToolbar = styled(Toolbar)({});

function Navbar() {
  const [newMessages, setNewMessages] = useState<number>(2);
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const handleShowMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <AppBar
      position="sticky"
      className="classes.appBar"
      elevation={0}
      sx={{
        p: "1%",
        backgroundColor: "#1F1F1F",
        m: 0,
      }}
    >
      <StyledToolbar>
        <Stack
          direction="row"
          flexGrow={1}
          sx={{ display: { xs: "none", sm: "flex" } }}
          alignItems="center"
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="logo"
            disableRipple
          >
            <img
              src="/images/KeyBay Logo .svg"
              style={{ width: "auto", height: 70 }}
            />
          </IconButton>
        </Stack>

        <Stack
          direction="row"
          spacing={2}
          sx={{ display: { xs: "none", sm: "block" } }}
        >
          <IconButton title="Messages">
            <Badge badgeContent={newMessages} color="error">
              <TextsmsIcon sx={{ color: "#8C52FF", height: 40, width: 40 }} />
            </Badge>
          </IconButton>
          <IconButton title="Home">
            <HomeIcon sx={{ color: "#8C52FF", height: 50, width: 50 }} />
          </IconButton>
          <IconButton title="Profile">
            <Avatar src="/images/user_icon.png" />
          </IconButton>
        </Stack>

        <IconButton
          onClick={handleShowMenu}
          title="Menu"
          sx={{ display: { xs: "block", sm: "none" } }}
        >
          <MenuIcon fontSize="large" sx={{ color: "#8C52FF" }} />
        </IconButton>
      </StyledToolbar>
      <Menu
        open={showMenu}
        onClose={() => {
          setShowMenu(false);
        }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem>Test 1</MenuItem>
        <MenuItem>Test 2</MenuItem>
      </Menu>
    </AppBar>
  );
}

export default Navbar;
