import { useState } from "react";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

export default function SuperHeroForm({ open, handleClose, handleAddHero }) {
  // DRY THIS
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  function onAddHero() {
    handleAddHero([
      {
        firstName,
        lastName,
        email,
      },
    ]);

    setFirstName("");
    setLastName("");
    setEmail("");
  }

  return (
    <Dialog open={open}>
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
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          disabled={!firstName || !lastName || !email}
          onClick={onAddHero}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}
