import React, { useState } from "react";
import { Paper, Typography, Grid, Button, Menu, MenuItem } from "@mui/material";

function CarImg({ image_url }) {
  return (
    <Paper
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "11rem",
        width: "11rem",
        backgroundColor: "yellow",
        borderRadius: "12px",
        overflow: "hidden", // Corrected typo from "verflow" to "overflow"
      }}
    >
      <img
        src={image_url}
        alt="Car"
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "12px",
          objectFit: "cover",
        }}
      />
    </Paper>
  );
}

function GeneralUserCard({
  user,
  image_url,
  series,
  model,
  year,
  type,
  color,
}) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "10px",
        width: "12rem",
        height: "14rem",
        margin: "16px auto",
        borderRadius: "15px",
        backgroundColor: "rgb(217, 217, 217)",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontFamily: "'Roboto', sans-serif",
          textAlign: "left",
          fontWeight: 500,
          fontStyle: "normal",
          fontSize: "12px",
          color: "rgb(177, 105, 28)",
          width: "100%",
          marginLeft: "1rem",
        }}
      >
        {user}'s car:
      </Typography>
      <CarImg image_url={image_url} />
      <Button
        variant="contained"
        onClick={handleClick}
        sx={{
          marginTop: "8px",
          height: "1.5rem",
          fontSize: "16px",
          fontWeight: 300,
          fontStyle: "normal",
          boxShadow: "10 10 10px 0 rgba(255, 0, 0, 0.1)",
          backgroundColor: "rgb(255, 147, 32)",
          color: "rgb(255, 255, 255)",
        }}
      >
        Show Details
      </Button>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem>
          <Typography variant="body1">Series: {series}</Typography>
        </MenuItem>
        <MenuItem>
          <Typography variant="body1">Model: {model}</Typography>
        </MenuItem>
        <MenuItem>
          <Typography variant="body1">Year: {year}</Typography>
        </MenuItem>
        <MenuItem>
          <Typography variant="body1">Type: {type}</Typography>
        </MenuItem>
        <MenuItem>
          <Typography variant="body1">Color: {color}</Typography>
        </MenuItem>
      </Menu>
    </Paper>
  );
}

export default function CarDisplay({
  post_id,
  user,
  image_url,
  series,
  model,
  year,
  type,
  color,
}) {
  return (
    <div>
      {/* <p>{post_id}</p> */}
      <GeneralUserCard
        user={user} 
        image_url={image_url}
        series={series}
        model={model}
        year={year}
        type={type}
        color={color}
      />
    </div>
  );
}