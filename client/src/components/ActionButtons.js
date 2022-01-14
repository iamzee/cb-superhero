import Stack from "@mui/material/Stack";
import AddSuperHeroMenuButton from "./AddSuperHeroMenuButton";

export default function ActionButtons({ handleAddHero }) {
  return (
    <Stack direction="row" spacing={2} sx={{ marginBottom: "16px" }}>
      <AddSuperHeroMenuButton handleAddHero={handleAddHero} />
    </Stack>
  );
}
