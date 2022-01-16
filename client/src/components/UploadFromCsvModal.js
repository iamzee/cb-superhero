import { useState } from "react";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import DialogContentText from "@mui/material/DialogContentText";
import CircularProgress from "@mui/material/CircularProgress";

export default function UploadFromCsvModal({
  open,
  handleClose,
  handleAddBulkHero,
}) {
  const [processing, setProcessing] = useState(false);

  function toCsv(csv) {
    var lines = csv.split("\n");

    var result = [];

    var headers = lines[0].split(",");

    for (var i = 1; i < lines.length; i++) {
      var obj = {};
      var currentline = lines[i].split(",");

      for (var j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }

      result.push(obj);
    }

    return result;
  }

  function handleFileChange(event) {
    setProcessing(true);

    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = function (e) {
        handleAddBulkHero(toCsv(e.target.result));
      };
    }

    setProcessing(false);
  }

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Import CSV file</DialogTitle>
        <DialogContent>
          <DialogContentText>
            CSV file should have the following format with the given header
            <br />
            -------------------------------------------
            <br />
            firstName,lastName,email
            <br />
            Lionel,Messi,lionel@example.com
            <br />
            Cristiano,Ronaldo,ronaldo@example.com
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          {processing ? (
            <Button
              variant="contained"
              startIcon={<CircularProgress color="inherit" size={14} />}
            >
              Processing
            </Button>
          ) : (
            <Button variant="contained">
              <label htmlFor="csv-upload">Import</label>
            </Button>
          )}
        </DialogActions>
      </Dialog>
      <input
        id="csv-upload"
        style={{ display: "none" }}
        type="file"
        accept=".csv"
        multiple={false}
        onChange={handleFileChange}
      />
    </>
  );
}
