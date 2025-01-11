import { useRef, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import NavBar from "../Components/NavBarFinale";
import AddPopUp from "../Components/PopUpFinale";


const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  borderRadius: "30px",
  width: "100%",
  height: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "5%",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
}));

const AddCarContainer = styled(Stack)(({ theme }) => ({
  height: "100%",
  width: "100%",
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(0),
  background: "rgb(255, 153, 43)",
  margin: "0",
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(0),
  },
}));

export default function AddCar() {
  const [series, setSeries] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [type, setType] = useState("");
  const [image, setImage] = useState("");
  const [color, setColor] = useState("");

  const [showPopUp, setShowPopUp] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const carData = {
      series,
      model,
      year,
      type,
      image,
      color,
    };
    const iSDataCorrect =
    series != "" &&
    model != "" &&
    year != "" &&
    type != "" &&
    image != "" &&
    color != "";


    const user_id1 = sessionStorage.getItem("userID");
    const user_name1 = sessionStorage.getItem("userName");
    if (user_id1 != null) {  
      try {
        const id1 = 0;
        const data = {
          post_id: id1,
          userID: user_id1,       
          username: user_name1,   
          image_url: image,
          model: model,
          year: year,
          type: type,
          series: series,
          color: color,
        };
        const response = await fetch('http://localhost:8000/post', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
          setSeries("")
          setModel("")
          setType("")
          setYear("")
          setImage("")
          setColor("")
        } else if (response.status === 404) {
          console.log("Car was not saaved");
        } else {
          console.log("An error occurred. Please try again later.");
        }
      } catch (err) {
        console.log("An error occurred. Please try again later.");
        console.error(err);
      }
      setIsSuccess(iSDataCorrect);
      setShowPopUp(iSDataCorrect);

      setTimeout(() => {
        setShowPopUp("");
      }, 3000);
    }
  };

  return (
    <>
      {/* <NavBar /> */}
      <Paper>
        <AddPopUp trigger={showPopUp} success={isSuccess} />
      </Paper>
      <AddCarContainer direction="column" justifyContent="space-between" sx={{
        backgroundImage: `url("https://cdn.mos.cms.futurecdn.net/SXWyHVjYC6gTGvsdnVcoAT.png")`,
        backgroundRepeat: "repeat",
        backgroundPositionY: "30%",
        backgroundPositionX: "70%",
        backgroundSize: "70%",
      }}>
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            textAlign="center"
            justifyContent="center"
            sx={{
              whiteSpace: "nowrap",
              width: "1%",
              fontSize: "clamp(2rem, 10vw, 2.15rem)",
            }}
          >
            Add car to your collection
          </Typography>
          <Box
            component="form"
            noValidate
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: 2,
            }}
          >
            <FormControl>
            <FormLabel
                htmlFor="model"
                sx={{ display: "block", textAlign: "left" }}
              >
                Series
              </FormLabel>
              <TextField
                type="text"
                name="series"
                placeholder="HW Turbo"
                id="series"
                required
                onChange={(e) => setSeries(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel
                htmlFor="model"
                sx={{ display: "block", textAlign: "left" }}
              >
                Car's Model:
              </FormLabel>
              <TextField
                value={model}
                id="model"
                type="model"
                name="model"
                placeholder="Mercedes-Benz 500 E"
                autoFocus
                required
                fullWidth
                variant="outlined"
                onChange={(e) => setModel(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel
                htmlFor="year"
                sx={{ display: "block", textAlign: "left" }}
              >
                Car's Year:
              </FormLabel>
              <TextField
                type="number"
                name="year"
                placeholder="2023"
                id="year"
                required
                onChange={(e) => setYear(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel
                htmlFor="year"
                sx={{ display: "block", textAlign: "left" }}
              >
                Car's Type:
              </FormLabel>
              <TextField
                type="text"
                name="type"
                placeholder="Sedan"
                id="type"
                required
                onChange={(e) => setType(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel
                htmlFor="image"
                sx={{ display: "block", textAlign: "left" }}
              >
                Car's Image:
              </FormLabel>
              <TextField
                value={image}
                id="image"
                type="text"
                name="image"
                placeholder="https://..."
                autoFocus
                required
                fullWidth
                variant="outlined"
                onChange={(e) => setImage(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel
                htmlFor="color"
                sx={{ display: "block", textAlign: "left" }}
              >
                Car's Color:
              </FormLabel>
              <TextField
                value={color}
                id="color"
                type="text"
                name="color"
                placeholder="Black"
                autoFocus
                required
                fullWidth
                variant="outlined"
                onChange={(e) => setColor(e.target.value)}
              />
            </FormControl>

            <Divider />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={handleSubmit}
            >
              Add to collection
            </Button>
          </Box>
          <Divider />
        </Card>
      </AddCarContainer>
    </>
  );
}
