import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import ClearAllIcon from "@mui/icons-material/ClearAll";

import AddSuperHeroMenuButton from "./AddSuperHeroMenuButton";
import SendMailButton from "./SendMailButton";

export default function ActionButtons({
  handleSetAppStatus,
  heroes,
  handleSendMail,
  appStatus,
  heroesDispatch,
}) {
  return (
    <Stack direction="row" spacing={2} sx={{ marginBottom: "32px" }}>
      {appStatus !== "SENT" && (
        <SendMailButton
          heroes={heroes}
          handleSendMail={handleSendMail}
          appStatus={appStatus}
        />
      )}
      {appStatus !== "SENDING" && appStatus !== "SENT" && (
        <AddSuperHeroMenuButton heroesDispatch={heroesDispatch} />
      )}

      {appStatus === "SENT" && (
        <Button
          variant="outlined"
          startIcon={<ClearAllIcon />}
          onClick={() => {
            heroesDispatch({ type: "deleteAll" });
            handleSetAppStatus("");
          }}
          disabled={heroes.length === 0}
        >
          Clear All
        </Button>
      )}
    </Stack>
  );
}
