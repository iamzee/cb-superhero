import Stack from "@mui/material/Stack";
import AddSuperHeroMenuButton from "./AddSuperHeroMenuButton";

import Button from "@mui/material/Button";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";

export default function ActionButtons({ handleAddHero, handleDeleteAll }) {
  return (
    <Stack direction="row" spacing={2} sx={{ marginBottom: "16px" }}>
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
