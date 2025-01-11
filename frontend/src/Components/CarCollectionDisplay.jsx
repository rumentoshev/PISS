import React, { useState, useEffect } from "react";
import {
  Paper,
  Typography,
  Grid,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
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
        overflow: "hidden",
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

function UserCard1({ coll_name,post_id, image_url, series, model, year, type, color }) {
  const [anchorEl, setAnchorEl] = useState(null);
  




  const handleDelete = async (post_id,coll_name) => {
    //console.log(post_id,coll_name)
    try {
        const userId = sessionStorage.getItem("userID");
      const response = await fetch(
        `http://localhost:8000/delete_car_from_coll/${post_id}_${userId}_${coll_name}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete the car");
      }
      window.location.reload();
    } catch (error) {
      console.error("Error deleting car:", error);
    }
  };
  const handleDetailsClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDetailsClose = () => {
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
        width: "14rem",
        height: "16rem",
        margin: "16px auto",
        borderRadius: "15px",
        backgroundColor: "rgb(217, 217, 217)",
      }}
      
    >
      <CarImg image_url={image_url} />
      <Grid
        container
        spacing={1}
        justifyContent="center"
        alignItems="center"
        sx={{ marginTop: "8px" }}
      >
        <Grid item>
          <Button
            variant="contained"
            onClick={handleDetailsClick}
            sx={{
              height: "2rem",
              fontSize: "14px",
              fontWeight: 400,
              backgroundColor: "rgb(255, 147, 32)",
              color: "rgb(255, 255, 255)",
            }}
          >
            Show Details
          </Button>
        </Grid>
        <Grid item>
          <IconButton
            sx={{
              height: "2rem",
              width: "2rem",
              fontSize: "14px",
              borderRadius: "8px",
              backgroundColor: "red",
              color: "white",
              "&:hover": {
                backgroundColor: "darkred",
              },
            }}
            onClick={() => handleDelete(post_id,coll_name)}
          >
            <DeleteIcon />
          </IconButton>
        </Grid>
      </Grid>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleDetailsClose}
      >
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

// Main component
export default function CarCollectionDisplay({
    coll_name1,  
  post_id,
  image_url,
  series,
  model,
  year,
  type,
  color,
}) {
  return (
    <div >
      <UserCard1
        coll_name={coll_name1}
        post_id={post_id}
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
