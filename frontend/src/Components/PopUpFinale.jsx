import Raact from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import Alert from "@mui/material/Alert";

function PopUpBox({ children }) {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      position="fixed"
      top="0"
      left="0"
      width="100vw"
      height="100vh"
      zIndex="10"
      bgcolor="rgba(0, 0, 0, 0.3)"
    >
      {children}
    </Box>
  );
}

function PopUpAlert({ children, severity }) {
  return (
    <PopUpBox>
      <Alert
        variant="filled"
        severity={severity}
        sx={{
          width: "25%",
          height: "15%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {children}
      </Alert>
    </PopUpBox>
  );
}

export default function AddPopUp(props) {
  const { trigger } = props;

  let severity;
  let message;

  switch (trigger) {
    case true:
      severity = "success";
      message = "Car was added successfully!";
      break;

    case false:
      severity = "error";
      message = "Car was NOT added successfully!";
      break;

    default:
      return null;
  }

  return <PopUpAlert severity={severity}>{message}</PopUpAlert>;
}