import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";

import AddSuperHeroMenuButton from "./AddSuperHeroMenuButton";
import SendMailButton from "./SendMailButton";

export default function ActionButtons({
  handleAddHero,
  handleDeleteAll,
  heroes,
}) {
  return (
    <Stack direction="row" spacing={2} sx={{ marginBottom: "16px" }}>
      <SendMailButton heroes={heroes} />
      <AddSuperHeroMenuButton handleAddHero={handleAddHero} />
      <Button
        variant="outlined"
        startIcon={<DeleteSweepIcon />}
        onClick={handleDeleteAll}
      >
        Delete All
      </Button>
    </Stack>
  );
}
