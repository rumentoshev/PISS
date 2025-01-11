import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import HomeIcon from "@mui/icons-material/Home";
import Box from "@mui/material/Box";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";

export default function NavBarNotLoged() {
  return (
    <AppBar position="static" sx={{ top: 0, left: 0, right: 0, width: "100%" }}>
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          height: "64px",
          paddingX: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Link
            to="/signUp"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <IconButton
              size="medium"
              edge="start"
              color="inherit"
              aria-label="home"
            >
              <HomeIcon />
            </IconButton>
          </Link>
          <Typography variant="h6" component="div" fontFamily={""}>
            HotWheelsVault
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginRight: 15,
            gap: 1,
            flexGrow: 1,
            justifyContent: "center"
          }}
        >
          <Link
            to="/signUp"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Button
              sx={{
                color: "inherit",
                borderRadius: "15px",
                boxShadow: "0 0 30px 0 rgba(255, 0, 0, 0.1)",
                margin: 2,
              }}
            >
              My Collections
            </Button>
          </Link>
          <Link
            to="/explore"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Button
              sx={{
                color: "inherit",
                borderRadius: "15px",
                boxShadow: "0 0 30px 0 rgba(0, 0, 0, 0.1)",
                margin: 2,
              }}
            >
              Explore
            </Button>
          </Link>
          <Link to="/sss" style={{ textDecoration: "none", color: "inherit" }}>
            <Button
              sx={{
                color: "inherit",
                borderRadius: "15px",
                boxShadow: "0 0 30px 0 rgba(0, 0, 0, 0.1)",
                margin: 2,
              }}
            >
              Show Cars
            </Button>
          </Link>
          <Link to="/sss" style={{ textDecoration: "none", color: "inherit" }}>
            <Button
              sx={{
                color: "inherit",
                borderRadius: "15px",
                boxShadow: "0 0 30px 0 rgba(0, 0, 0, 0.1)",
                margin: 2,
              }}
            >
              Add Car
            </Button>
          </Link>
        </Box>

        
        <Box>
        <Link to="/signIn" style={{ textDecoration: "none", color: "inherit" }}>
            <Button
              sx={{
                color: "inherit",
                borderRadius: "15px",
                boxShadow: "0 0 30px 0 rgba(0, 0, 0, 0.1)",
                margin: 2,
              }}
            >
              Sign In
            </Button>
          </Link>
          <Link to="/signUp" style={{ textDecoration: "none", color: "inherit" }}>
            <Button
              sx={{
                color: "inherit",
                borderRadius: "15px",
                boxShadow: "0 0 30px 0 rgba(0, 0, 0, 0.1)",
                margin: 2,
              }}
            >
              Register
            </Button>
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
