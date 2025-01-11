import { useRef, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { Tooltip } from "@mui/material";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom"; 

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  borderRadius: "6%",
  width: "100%",
  height: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "5%",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: "100%",
  width: "100%",
  minHeight: "100vh",
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "center",
  padding: theme.spacing(0),
  background: "rgb(255, 153, 43)",
  margin: "0",
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(0),
  },
}));

// const EMAIL_REGEX = /\S+@\S+\.\S+/;
// const PASSWORD_REGEX = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{5,25}/;

const EMAIL_REGEX = /\S+@\S+\.\S+/;
const PASSWORD_REGEX = /(?=.*[0-9]).{1,25}/;

export default function SignIn() {
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

  const [data, setData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateInputs()) {
      try {
        const response = await fetch(
          `http://localhost:8000/user_exist/${data.email}_${data.password}`
        );

        if (response.ok) {
          const user = await response.json(); 
          sessionStorage.setItem("isLogged", "true");
          sessionStorage.setItem("userID", user.id);
          sessionStorage.setItem("userName", user.username);
          navigate("/"); 
        } else if (response.status === 404) {
          console.log("Invalid email or password");
        } else {
          console.log("An error occurred. Please try again later.");
        }
      } catch (err) {
        console.log("An error occurred. Please try again later.");
        console.error(err);
      }
    }
  };

  const validateInputs = () => {
    let isValid = true;

    if (!data.email || !EMAIL_REGEX.test(data.email)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (!data.password || !PASSWORD_REGEX.test(data.password)) {
      setPasswordError(true);

      if (!data.password) {
        setPasswordErrorMessage("Password is required!");
      } else if (data.password.length < 5) {
        setPasswordErrorMessage("Password must be at least 5 characters!");
      } else if (data.password.length > 25) {
        setPasswordErrorMessage("Password must be at most 25 characters!");
      } else if (!PASSWORD_REGEX.test(data.password)) {
        setPasswordErrorMessage("Password must meet the required format!");
      }

      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    return isValid;
  };

  return (
    <>
      <SignInContainer
        direction="column"
        justifyContent="space-between"
        sx={{
          backgroundImage: `url("https://cdn.mos.cms.futurecdn.net/SXWyHVjYC6gTGvsdnVcoAT.png")`,
          backgroundRepeat: "repeat",
          backgroundPositionY: "30%",
          backgroundPositionX: "70%",
          backgroundSize: "70%",
        }}
      >
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
            Sign in
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
                htmlFor="email"
                sx={{ display: "block", textAlign: "left" }}
              >
                Email
              </FormLabel>
              <TextField
                onChange={handleChange}
                value={data.email}
                error={emailError}
                helperText={emailErrorMessage}
                id="email"
                type="email"
                name="email"
                placeholder="your@email.com"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={emailError ? "error" : "primary"}
              />
            </FormControl>
            <FormControl>
              <FormLabel
                htmlFor="password"
                sx={{ display: "block", textAlign: "left" }}
              >
                Password
              </FormLabel>
              <Tooltip
                title="Contains at least one lowercase letter, one uppercase letter, one digit, 
      one special character [!, @, #, $, %] and has a length of 5 to 25 characters."
                arrow
              >
                <TextField
                  onChange={handleChange}
                  value={data.password}
                  error={passwordError}
                  helperText={passwordErrorMessage}
                  name="password"
                  placeholder="*******"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  autoFocus
                  required
                  fullWidth
                  variant="outlined"
                  color={passwordError ? "error" : "primary"}
                />
              </Tooltip>
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={handleSubmit}
            >
              Sign in
            </Button>
          </Box>
          <Divider />
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography sx={{ textAlign: "center" }}>
              Don&apos;t have an account?{" "}
              <Link to="/signUp" variant="body2" sx={{ alignSelf: "center" }}>
                Sign up
              </Link>
            </Typography>
          </Box>
          {/* <Button>
              <Link to="/homeNotLoged">Back</Link>
          </Button> */}
        </Card>
      </SignInContainer>
    </>
  );
}
