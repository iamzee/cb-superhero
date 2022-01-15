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

  function onSubmit() {
    const payload = {
      firstName,
      lastName,
      email,
    };

    if (hero) {
      handleSubmit(payload, hero.email);
      handleClose();
    } else {
      handleSubmit([payload]);
    }

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
        <Button disabled={!firstName || !lastName || !email} onClick={onSubmit}>
          {hero ? "Update" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
