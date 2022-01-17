import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";

import AddSuperHeroMenuButton from "./AddSuperHeroMenuButton";
import SendMailButton from "./SendMailButton";

export default function ActionButtons({
  // handleDeleteAll,
  heroes,
  handleSendMail,
  appStatus,
  heroesDispatch,
}) {
  return (
    <Stack direction="row" spacing={2} sx={{ marginBottom: "32px" }}>
      <SendMailButton
        heroes={heroes}
        handleSendMail={handleSendMail}
        appStatus={appStatus}
      />
      <AddSuperHeroMenuButton heroesDispatch={heroesDispatch} />
      {/* <Button
        variant="outlined"
        startIcon={<DeleteSweepIcon />}
        onClick={handleDeleteAll}
        disabled={heroes.length === 0}
      >
        Delete All
      </Button> */}
    </Stack>
  );
}
