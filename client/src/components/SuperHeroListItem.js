import { useState } from "react";

import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Chip from "@mui/material/Chip";
import DoneIcon from "@mui/icons-material/Done";
import ErrorIcon from "@mui/icons-material/Error";

import SuperHeroForm from "./SuperHeroForm";

export default function SuperHeroListItem({ hero, heroesDispatch, appStatus }) {
  const [openForm, setOpenForm] = useState(false);
  return (
    <>
      <TableRow key={hero.email}>
        <TableCell>{hero.firstName}</TableCell>
        <TableCell>{hero.lastName}</TableCell>
        <TableCell>{hero.email}</TableCell>
        {appStatus === "SENDING" || appStatus === "SENT" ? (
          <TableCell>
            {hero.status.inProgress === true ? (
              <Chip
                icon={<CircularProgress size={12} color="inherit" />}
                color="warning"
                label="Sending"
              />
            ) : (
              <>
                {hero.status.success ? (
                  <Chip
                    icon={<DoneIcon fontSize="small" />}
                    label="Sent"
                    color="success"
                  />
                ) : (
                  <Chip
                    icon={<ErrorIcon fontSize="small" />}
                    label={hero.status.message}
                    color="error"
                  />
                )}
              </>
            )}
          </TableCell>
        ) : (
          <TableCell>
            <Button onClick={() => heroesDispatch({ type: "delete", hero })}>
              Delete
            </Button>
            <Button onClick={() => setOpenForm(true)}>Edit</Button>
          </TableCell>
        )}
      </TableRow>
      <SuperHeroForm
        open={openForm}
        handleClose={() => setOpenForm(false)}
        handleSubmit={payload => {
          heroesDispatch({ type: "update", email: hero.email, hero: payload });
        }}
        hero={hero}
      />
    </>
  );
}
