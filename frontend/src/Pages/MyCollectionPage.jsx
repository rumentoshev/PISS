import React, { useState, useEffect } from "react";
import NavBar from "../Components/NavBarFinale";
import MyCarDisplay from "../Components/MyCarDisplay";
import { Grid } from "@mui/material";
import CarDisplay from "../Components/CarDisplay";
import { Box } from "@mui/material";

async function fetchData() {
  try {
    const user_id = sessionStorage.getItem("userID");
    const response = await fetch(`http://localhost:8000/user_cars/${user_id}`,
      {
        method: "GET"
      }
    );
    if (!response.ok) {
      throw new Error(`Error with status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching cars:", error);
    throw error;
  }
}

export default function MyCollectionPage() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const loadData = async () => {
      try {
        const fetchedData = await fetchData();
        setCars(fetchedData);
      } catch (err) {
        setError(err.message || "Failed to load cars");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);
  if (error) {
    return <div>Error: {error}</div>;
  }

  if (cars.length === 0) {
      return (
        <div>
          {/* <NavBar /> */}
          <Box
            sx={{
              backgroundImage: `url("https://cdn.mos.cms.futurecdn.net/SXWyHVjYC6gTGvsdnVcoAT.png")`,
              backgroundRepeat: "repeat",
              backgroundPositionY: "30%",
              backgroundPositionX: "70%",
              backgroundSize: "70%",
              minHeight: "100vh",
              paddingTop: "80px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                backgroundColor: "rgba(0, 0, 0, 0.7)",
                color: "white",
                padding: "20px 40px",
                borderRadius: "8px",
                boxShadow: "0px 4px 10px rgba(0,0,0,0.5)",
                fontSize: "24px",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              NO CARS
            </Box>
          </Box>
        </div>
      );
    }
  
  return (
    <div>
      {/* <NavBar /> */}
      <Box sx={{
          backgroundImage: `url("https://cdn.mos.cms.futurecdn.net/SXWyHVjYC6gTGvsdnVcoAT.png")`,
          backgroundRepeat: "repeat",
          backgroundPositionY: "30%",
          backgroundPositionX: "70%",
          backgroundSize: "70%",
          minHeight: "100vh",
          paddingTop: "80px"
        }}>
      <Grid container spacing={3} justifyContent="center">
        {cars.map((car, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <MyCarDisplay
            post_id = {car.id}
                user = {car.username}
              image_url={car.image_url}
              series={car.series}
              model={car.model}
              year={car.year}
              type={car.type}
              color={car.color}
              username = {car.username}
            />
          </Grid>
        ))}
      </Grid>
      </Box>
    </div>
  );
}
