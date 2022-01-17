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
  heroesDispatch,
  // handleDeleteHero,
  // handleUpdateHero,
  appStatus,
  // sendStatus,
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
              <TableCell>Online course RC</TableCell>
              <TableCell>Live course RC</TableCell>
              <TableCell>Offline course RC</TableCell>
              {appStatus === "SENDING" || appStatus === "SENT" ? (
                <TableCell>Status</TableCell>
              ) : (
                <TableCell>Actions</TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map(hero => (
              <SuperHeroListItem
                key={hero.email}
                hero={hero}
                heroesDispatch={heroesDispatch}
                appStatus={appStatus}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
