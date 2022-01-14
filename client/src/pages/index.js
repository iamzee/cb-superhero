import { useState } from "react";

import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import AddSuperHeroForm from "../components/AddSuperHeroForm";
import SuperHeroList from "../components/SuperHeroList";

export default function HomePage() {
  const [addDialog, setAddDialog] = useState(false);
  const [heroesToAdd, setHeroesToAdd] = useState([]);

  function handleAddDialogClose() {
    setAddDialog(false);
  }

  function handleAddHero(hero) {
    setHeroesToAdd([hero, ...heroesToAdd]);
  }

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="inherit">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Coding Blocks
            </Typography>
            <Button
              variant="contained"
              onClick={() => setAddDialog(true)}
              color="primary"
            >
              Add SuperHero
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Box sx={{ padding: "24px" }}>
        <SuperHeroList list={heroesToAdd} />
      </Box>

      <AddSuperHeroForm
        open={addDialog}
        handleClose={handleAddDialogClose}
        handleAddHero={handleAddHero}
      />
    </div>
  );
}
