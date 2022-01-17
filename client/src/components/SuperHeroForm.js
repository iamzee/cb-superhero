import { useState } from "react";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

export default function SuperHeroForm({
  open,
  handleClose,
  handleSubmit,
  hero,
}) {
  // DRY THIS
  const [firstName, setFirstName] = useState(hero ? hero.firstName : "");
  const [lastName, setLastName] = useState(hero ? hero.lastName : "");
  const [email, setEmail] = useState(hero ? hero.email : "");
  const [onlineCourseRC, setOnlineCourseRC] = useState(
    hero ? hero.onlineCourseRC : ""
  );
  const [liveCourseRC, setLiveCourseRC] = useState(
    hero ? hero.liveCourseRC : ""
  );
  const [offlineCourseRC, setOfflineCourseRC] = useState(
    hero ? hero.offlineCourseRC : ""
  );

  function onSubmit() {
    const payload = {
      firstName,
      lastName,
      email,
      onlineCourseRC,
      liveCourseRC,
      offlineCourseRC,
    };
    handleSubmit(payload);
    if (hero) {
      handleClose();
    }

    setFirstName("");
    setLastName("");
    setEmail("");
    setOnlineCourseRC("");
    setLiveCourseRC("");
    setOfflineCourseRC("");
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add SuperHero</DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            columnGap: "8px",
          }}
        >
          <TextField
            type="text"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            label="First name"
            variant="standard"
            fullWidth
          />
          <TextField
            type="text"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            variant="standard"
            label="Last name"
            fullWidth
          />
        </Box>

        <TextField
          type="email"
          variant="standard"
          value={email}
          onChange={e => setEmail(e.target.value)}
          label="Email"
          fullWidth
        />

        <TextField
          type="text"
          variant="standard"
          value={onlineCourseRC}
          onChange={e => setOnlineCourseRC(e.target.value)}
          label="Online course referral code"
          fullWidth
        />
        <TextField
          type="text"
          variant="standard"
          value={liveCourseRC}
          onChange={e => setLiveCourseRC(e.target.value)}
          label="Live course referral code"
          fullWidth
        />
        <TextField
          type="text"
          variant="standard"
          value={offlineCourseRC}
          onChange={e => setOfflineCourseRC(e.target.value)}
          label="Offline course referral code"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          variant="contained"
          disabled={
            !firstName ||
            !lastName ||
            !email ||
            !onlineCourseRC ||
            !liveCourseRC ||
            !offlineCourseRC
          }
          onClick={onSubmit}
        >
          {hero ? "Update" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
