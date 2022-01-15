import { useState } from "react";

import Box from "@mui/material/Box";

import SuperHeroList from "../components/SuperHeroList";
import ActionButtons from "../components/ActionButtons";

export default function HomePage() {
  const [heroesToAdd, setHeroesToAdd] = useState([]);

  function handleAddHero(hero) {
    setHeroesToAdd([...hero, ...heroesToAdd]);
  }

  function handleDeleteHero(hero) {
    setHeroesToAdd(heroesToAdd.filter(h => h.email !== hero.email));
  }

  function handleDeleteAll() {
    setHeroesToAdd([]);
  }

  function handleUpdateHero(hero, email) {
    setHeroesToAdd(
      heroesToAdd.map(h => {
        if (h.email === email) return hero;
        return h;
      })
    );
  }

  return (
    <Box sx={{ maxWidth: "900px", margin: "auto", paddingTop: "24px" }}>
      <img
        src="/assets/cblogo-black.png"
        style={{ height: "64px", width: "auto", marginBottom: "32px" }}
      />
      <ActionButtons
        handleAddHero={handleAddHero}
        handleDeleteHero={handleDeleteHero}
        handleDeleteAll={handleDeleteAll}
        heroes={heroesToAdd}
      />
      {heroesToAdd.length === 0 ? (
        <Box sx={{ width: "300px", height: "300px", margin: "auto" }}>
          <img
            src="/assets/empty.svg"
            style={{ width: "100%", height: "100%" }}
          />
        </Box>
      ) : (
        <SuperHeroList
          list={heroesToAdd}
          handleDeleteHero={handleDeleteHero}
          handleUpdateHero={handleUpdateHero}
        />
      )}
    </Box>
  );
}
