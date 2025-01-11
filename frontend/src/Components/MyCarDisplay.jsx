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
async function fetchCollectionData() {
  try {
    const userid = sessionStorage.getItem("userID");
    const response = await fetch(
      `http://localhost:8000/all_user_coll/${userid}`
    );
    //console.log(response)
    if (!response.ok) {
      throw new Error(`Error with status: ${response.statusText}`);
    }
    const collections = await response.json();
    return collections;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}
function UserCard({ post_id, image_url, series, model, year, type, color }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedCollection, setSelectedCollection] = useState("");
  const [dropdownAnchor, setDropdownAnchor] = useState(null);
  const [collections, setCollections] = useState([]);
  
  useEffect(() => {
    async function loadCollections() {
      const fetchedCollections = await fetchCollectionData();
      setCollections(fetchedCollections);
    }
    loadCollections();
  }, []);

  const handleDelete = async (post_id) => {
    try {
      const response = await fetch(
        `http://localhost:8000/delete_car/${post_id}`,
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

  const handleAddClick = (event) => {
    setDropdownAnchor(event.currentTarget);
  };

  const handleDropdownClose = () => {
    setDropdownAnchor(null);
  };

  const handleCollectionChange = async (event) => {
    setSelectedCollection(event.target.value);
    setDropdownAnchor(null);
    console.log(event.target.value)
    try{
      const userID = sessionStorage.getItem("userID")
      const response = await fetch(`http://localhost:8000/add_post_to_collection/${post_id}_${event.target.value}_${userID}`,
        {
          method: "POST"
        }
      );
      
      if (!response.ok) {
        throw new Error('Failed to add post to collection');
      }

    }
    catch{
      console.error('Error:'); 
    }

    setSelectedCollection("")
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
            onClick={() => handleDelete(post_id)}
          >
            <DeleteIcon />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton
            onClick={handleAddClick}
            sx={{
              height: "2rem",
              width: "2rem",
              fontSize: "14px",
              borderRadius: "8px",
              backgroundColor: "green",
              color: "white",
              "&:hover": {
                backgroundColor: "darkgreen",
              },
            }}
          >
            <AddIcon />
          </IconButton>
          <Menu
            anchorEl={dropdownAnchor}
            open={Boolean(dropdownAnchor)}
            onClose={handleDropdownClose}
          >
            <FormControl sx={{ minWidth: 120, padding: "8px" }}>
              <InputLabel id="collection-label">Collection</InputLabel>
              <Select
                labelId="collection-label"
                value={selectedCollection}
                onChange={handleCollectionChange}
              >
                {collections.map((collection) => (
                  <MenuItem key={collection.id} value={collection.id}>
                    {collection.collection_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Menu>
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
export default function MyCarDisplay({
  post_id,
  image_url,
  series,
  model,
  year,
  type,
  color,
}) {
  return (
    <div>
      <UserCard
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
