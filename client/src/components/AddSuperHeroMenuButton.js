import { useState } from "react";

import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";

import SuperHeroForm from "./SuperHeroForm";
import UploadFromCsv from "./UploadFromCsv";

export default function AddSuperHeroMenuButton({ heroesDispatch }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [manualEntryDialog, setManualEntryDialog] = useState(false);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        startIcon={<AddIcon />}
        variant="outlined"
        onClick={handleClick}
        color="primary"
      >
        Add SuperHero
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <UploadFromCsv heroesDispatch={heroesDispatch} />
        <MenuItem
          onClick={() => {
            handleClose();
            setManualEntryDialog(true);
          }}
        >
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Manual Entry</ListItemText>
        </MenuItem>
      </Menu>
      <SuperHeroForm
        open={manualEntryDialog}
        handleClose={() => setManualEntryDialog(false)}
        handleSubmit={hero => heroesDispatch({ type: "add", hero })}
      />
    </>
  );
}
