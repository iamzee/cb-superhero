import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import SuperHeroListItem from "./SuperHeroListItem";

export default function SuperHeroList({
  list,
  handleDeleteHero,
  handleUpdateHero,
}) {
  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map(hero => (
              <SuperHeroListItem
                key={hero.email}
                hero={hero}
                handleDeleteHero={handleDeleteHero}
                handleUpdateHero={handleUpdateHero}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
