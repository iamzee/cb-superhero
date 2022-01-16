import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";

import AddSuperHeroMenuButton from "./AddSuperHeroMenuButton";
import SendMailButton from "./SendMailButton";

export default function ActionButtons({
  handleAddHero,
  handleDeleteAll,
  heroes,
  handleAddBulkHero,
}) {
  return (
    <Stack direction="row" spacing={2} sx={{ marginBottom: "32px" }}>
      <SendMailButton heroes={heroes} />
      <AddSuperHeroMenuButton
        handleAddHero={handleAddHero}
        handleAddBulkHero={handleAddBulkHero}
      />
      <Button
        variant="outlined"
        startIcon={<DeleteSweepIcon />}
        onClick={handleDeleteAll}
        disabled={heroes.length === 0}
      >
        Delete All
      </Button>
    </Stack>
  );
}
