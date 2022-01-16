import { useState } from "react";

import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";

import UploadFileIcon from "@mui/icons-material/UploadFile";
import UploadFromCsvModal from "./UploadFromCsvModal";

export default function UploadFromCsv({ handleAddBulkHero }) {
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  return (
    <>
      <MenuItem onClick={() => setOpen(true)}>
        <ListItemIcon>
          <UploadFileIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Upload from csv</ListItemText>
      </MenuItem>
      <UploadFromCsvModal
        open={open}
        handleClose={handleClose}
        handleAddBulkHero={handleAddBulkHero}
      />
    </>
  );
}
