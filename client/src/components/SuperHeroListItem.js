import { useState } from "react";

import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";

import SuperHeroForm from "./SuperHeroForm";

export default function SuperHeroListItem({
  hero,
  handleDeleteHero,
  handleUpdateHero,
}) {
  const [openForm, setOpenForm] = useState(false);

  return (
    <>
      <TableRow key={hero.email}>
        <TableCell>{hero.firstName}</TableCell>
        <TableCell>{hero.lastName}</TableCell>
        <TableCell>{hero.email}</TableCell>
        <TableCell>
          <Button onClick={() => handleDeleteHero(hero)}>Delete</Button>
          <Button onClick={() => setOpenForm(true)}>Edit</Button>
        </TableCell>
      </TableRow>
      <SuperHeroForm
        open={openForm}
        handleClose={() => setOpenForm(false)}
        handleSubmit={handleUpdateHero}
        hero={hero}
      />
    </>
  );
}
