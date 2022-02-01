import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { isAuthenticated, logout } from "../helpers/auth";

export default function Header() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <img
        src="/assets/cblogo-black.png"
        style={{ height: "64px", width: "auto", marginBottom: "32px" }}
      />
      {isAuthenticated() ? (
        <>
          <Typography>Hi {isAuthenticated().user.firstname}</Typography>
          <Button
            variant="contained"
            onClick={() => {
              logout(() => {
                window.location.reload();
              });
            }}
          >
            Logout
          </Button>
        </>
      ) : (
        <a
          href={`${process.env.ONEAUTH_URL}/oauth/authorize?response_type=token&client_id=${process.env.ONEAUTH_CLIENTID}&redirect_uri=${process.env.BASE_URL}/callback/`}
        >
          <Button variant="contained">Login</Button>
        </a>
      )}
    </Box>
  );
}
