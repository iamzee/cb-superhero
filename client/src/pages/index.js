import { useState } from "react";

import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import SuperHeroList from "../components/SuperHeroList";
import ActionButtons from "../components/ActionButtons";

export default function HomePage() {
  const [heroesToAdd, setHeroesToAdd] = useState([]);

  function handleAddHero(hero) {
    setHeroesToAdd([...hero, ...heroesToAdd]);
  }

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="inherit">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Coding Blocks
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>

      <Box sx={{ padding: "24px" }}>
        <ActionButtons handleAddHero={handleAddHero} />
        <SuperHeroList list={heroesToAdd} />
      </Box>
    </div>
  );
}
