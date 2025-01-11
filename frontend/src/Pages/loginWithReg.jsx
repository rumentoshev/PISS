import { useRef, useState, useEffect, setError } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import { Tooltip } from "@mui/material";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import SignIn from "./LoginCeco"
import Register from "./Register";

const Card = styled(MuiCard)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignSelf: "center",
    width: "100%",
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: "auto",
    [theme.breakpoints.up("sm")]: {
      maxWidth: "450px",
    },
  }));
  
  const SignInContainer = styled(Stack)(({ theme }) => ({
    height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
    width: "calc((1 - var(--template-frame-width, 0)) * 100dvh)",
    minHeight: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(1),
    [theme.breakpoints.up("sm")]: {
      padding: theme.spacing(5),
    },
    background: "rgb(255, 153, 43)",
    "&::before": {
      content: '""',
      display: "block",
      position: "absolute",
      zIndex: -1,
      inset: 0,
    },
  }));
  

LOGIN.propTypes = {
    onLoginSuccess: PropTypes.func.isRequired,
  };

const EMAIL_REGEX = /\S+@\S+\.\S+/;
const PASSWORD_REGEX = /(?=.*[0-9]).{1,25}/;


export default function LOGIN({ onLoginSuccess }) {
    const [signInMode, setSignInMode] = useState(true); // State to toggle between sign-in and sign-up
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [data, setData] = useState({ email: "", password: "" });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setData((prevData) => ({ ...prevData, [name]: value }));
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      if (validateInputs(event)) {
        // Sign-in logic
        try {
          const response = await fetch(
            `http://localhost:8000/user_exist/${data.email}_${data.password}`
          );
  
          if (response.ok) {
            onLoginSuccess();
          } else {
            setError("Invalid email or password");
          }
        } catch (err) {
          setError("An error occurred. Please try again later.");
        }
      }
    };
    

    const validateInputs = () => {
      let isValid = true;
  
      // Sign-in validation logic
      if (!data.email || !EMAIL_REGEX.test(data.email)) {
        setEmailError(true);
        isValid = false;
      } else {
        setEmailError(false);
      }
  
      if (!data.password || !PASSWORD_REGEX.test(data.password)) {
        setPasswordError(true);
        isValid = false;
      } else {
        setPasswordError(false);
      }
  
      return isValid;
    };
  
    return (
      <>
        <CssBaseline />
        <SignInContainer direction="column" justifyContent="center">
          <Card variant="outlined">
            <Typography variant="h4" textAlign="center">
              {signInMode ? "Sign In" : "Sign Up"}
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit}>
              {signInMode ? (
                <>
                  <TextField
                    label="Email"
                    type="email"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                    error={emailError}
                    helperText={emailError ? "Invalid email" : ""}
                    fullWidth
                    required
                  />
                  <TextField
                    label="Password"
                    type="password"
                    name="password"
                    value={data.password}
                    onChange={handleChange}
                    error={passwordError}
                    helperText={passwordError ? "Invalid password" : ""}
                    fullWidth
                    required
                  />
                  <Button type="submit" fullWidth variant="contained">
                    Sign In
                  </Button>
                </>
              ) : (
                <Register onRegisterSuccess={() => setSignInMode(true)} />
              )}
            </Box>
            <Divider />
            <Box sx={{ textAlign: "center" }}>
              <Typography>
                {signInMode ? (
                  <>
                    Don &apos t have an account?{" "}
                    <Link
                      href="#"
                      onClick={() => setSignInMode(false)} // Switch to sign-up form
                    >
                      Sign Up
                    </Link>
                  </>
                ) : (
                  <>
                    Already have an account?{" "}
                    <Link
                      href="#"
                      onClick={() => setSignInMode(true)} // Switch to sign-in form
                    >
                      Sign In
                    </Link>
                  </>
                )}
              </Typography>
            </Box>
          </Card>
        </SignInContainer>
      </>
    );
  }
  