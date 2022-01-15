import axios from "axios";
import { useState } from "react";

import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import CircularProgress from "@mui/material/CircularProgress";

import Notify from "./Notify";

export default function SendMailButton({ heroes }) {
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState(null);

  async function handleClick() {
    setSending(true);

    const { data } = await axios({
      method: "POST",
      url: "/api/send",
      data: { data: heroes },
      headers: {
        "Content-Type": "application/json",
      },
    });

    setMessage({
      text: data.message,
      variant: data.success ? "success" : "error",
    });

    setSending(false);
  }

  return (
    <>
      {sending ? (
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
          onClick={handleClick}
          startIcon={<SendIcon />}
          variant="contained"
        >
          Send mail
        </Button>
      )}
      {message && (
        <Notify
          message={message.text}
          variant={message.variant}
          handleClose={() => setMessage(null)}
        />
      )}
    </>
  );
}
