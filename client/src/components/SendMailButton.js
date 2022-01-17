import axios from "axios";
import { useState } from "react";

import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import CircularProgress from "@mui/material/CircularProgress";

import Notify from "./Notify";

export default function SendMailButton({ heroes, handleSendMail, appStatus }) {
  return (
    <>
      {appStatus === "SENDING" ? (
        <Button
          disabled={true}
          startIcon={<CircularProgress color="inherit" size={16} />}
          variant="contained"
        >
          Sending mail
        </Button>
      ) : (
        <Button
          disabled={heroes.length === 0}
          onClick={handleSendMail}
          startIcon={<SendIcon />}
          variant="contained"
        >
          Send mail
        </Button>
      )}
    </>
  );
}
