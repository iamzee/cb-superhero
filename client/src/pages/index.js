import { useState, useReducer } from "react";
import axios from "axios";

import Box from "@mui/material/Box";

import SuperHeroList from "../components/SuperHeroList";
import ActionButtons from "../components/ActionButtons";

function heroesReducer(state, action) {
  switch (action.type) {
    case "add": {
      return [...state, { ...action.hero, status: {} }];
    }
    case "set": {
      return [...action.heroes];
    }
    case "delete": {
      return state.filter(s => s.email !== action.hero.email);
    }
    case "update": {
      return state.map(s => {
        if (s.email === action.email) {
          return action.hero;
        }
        return s;
      });
    }
  }
}

export default function HomePage() {
  const [appStatus, setAppStatus] = useState(""); // 'SENDING', 'SENT', ''

  const [heroes, heroesDispatch] = useReducer(heroesReducer, []);

  function handleDeleteAll() {
    setHeroesToAdd([]);
  }

  async function handleSendMail() {
    setAppStatus("SENDING");

    for (let i = 0; i < heroes.length; i++) {
      heroesDispatch({
        type: "update",
        email: heroes[i]["email"],
        hero: { ...heroes[i], status: { inProgress: true } },
      });
    }

    for (let i = 0; i < heroes.length; i++) {
      try {
        const { data } = await axios({
          method: "POST",
          url: "/api/send",
          data: { data: heroes[i] },
          headers: {
            "Content-Type": "application/json",
          },
        });

        heroesDispatch({
          type: "update",
          email: heroes[i]["email"],
          hero: { ...heroes[i], status: { inProgress: false, ...data } },
        });
      } catch (e) {
        if (e.response && e.response.data) {
          heroesDispatch({
            type: "update",
            email: heroes[i]["email"],
            hero: {
              ...heroes[i],
              status: { inProgress: false, ...e.response.data },
            },
          });
        }
        console.log("error================", e);
      }
    }

    setAppStatus("SENT");
  }

  return (
    <Box sx={{ maxWidth: "900px", margin: "auto", paddingTop: "24px" }}>
      <img
        src="/assets/cblogo-black.png"
        style={{ height: "64px", width: "auto", marginBottom: "32px" }}
      />
      <ActionButtons
        // handleDeleteAll={handleDeleteAll}
        heroes={heroes}
        handleSendMail={handleSendMail}
        appStatus={appStatus}
        heroesDispatch={heroesDispatch}
      />
      {heroes.length === 0 ? (
        <Box sx={{ width: "300px", height: "300px", margin: "auto" }}>
          <img
            src="/assets/empty.svg"
            style={{ width: "100%", height: "100%" }}
          />
        </Box>
      ) : (
        <SuperHeroList
          list={heroes}
          heroesDispatch={heroesDispatch}
          appStatus={appStatus}
        />
      )}
    </Box>
  );
}
