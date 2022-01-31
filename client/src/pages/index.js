import { useState, useReducer } from "react";
import axios from "axios";

import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";

import SuperHeroList from "../components/SuperHeroList";
import ActionButtons from "../components/ActionButtons";
import Header from "../components/Header";
import { isAuthenticated } from "../helpers/auth";

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
    case "deleteAll": {
      return [];
    }
  }
}

export default function HomePage() {
  const [appStatus, setAppStatus] = useState(""); // 'SENDING', 'SENT', ''
  const [heroes, heroesDispatch] = useReducer(heroesReducer, []);

  function handleSetAppStatus(status) {
    setAppStatus(status);
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
    <Box
      sx={{
        maxWidth: "90%",
        margin: "auto",
        paddingTop: "24px",
        paddingBottom: "24px",
      }}
    >
      <Header />
      {isAuthenticated() && isAuthenticated().user.role === "admin" ? (
        <>
          <ActionButtons
            heroes={heroes}
            handleSendMail={handleSendMail}
            appStatus={appStatus}
            heroesDispatch={heroesDispatch}
            handleSetAppStatus={handleSetAppStatus}
          />
          {appStatus === "SENDING" && (
            <Alert severity="warning">
              Do not refresh or close the browser while the process is running.
            </Alert>
          )}
          {appStatus === "SENT" && (
            <Alert severity="info">Clear all to send more emails.</Alert>
          )}
          {heroes.length === 0 ? (
            <Box sx={{ width: "300px", height: "300px", margin: "auto" }}>
              <img
                src="/assets/empty.svg"
                style={{ width: "100%", height: "100%" }}
              />
            </Box>
          ) : (
            <>
              <Chip
                label={`${heroes.length} Entries`}
                color="info"
                sx={{ margin: "16px 0px" }}
              />
              <SuperHeroList
                list={heroes}
                heroesDispatch={heroesDispatch}
                appStatus={appStatus}
              />
            </>
          )}
        </>
      ) : (
        <Alert severity="error">Unauthorised</Alert>
      )}
    </Box>
  );
}
