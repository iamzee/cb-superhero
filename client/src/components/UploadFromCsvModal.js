import { useState } from "react";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Divider from "@mui/material/Divider";

export default function UploadFromCsvModal({
  open,
  handleClose,
  heroesDispatch,
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
        heroesDispatch({ type: "set", heroes: toCsv(e.target.result) });
      };
    }

    setProcessing(false);
    handleClose();
  }

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Import CSV file</DialogTitle>
        <DialogContent>
          <Alert severity="info">
            <AlertTitle>Info</AlertTitle>
            CSV file should have the following format with the given header.
            <br />
            <Divider />
            firstName,lastName,email,onlineCourseRC,liveCourseRC,offlineCourseRC
            <br />
            Lionel,Messi,lionel@example.com,CODE1,CODE2,CODE3
            <br />
            Cristiano,Ronaldo,ronaldo@example.com,CODE4,CODE5,CODE6
          </Alert>
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
              <label
                style={{ width: "100%", height: "100%", cursor: "pointer" }}
                htmlFor="csv-upload"
              >
                Import
              </label>
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
