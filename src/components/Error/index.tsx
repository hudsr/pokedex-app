import { useNavigate } from "react-router";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function Error() {
  const navigate = useNavigate();

  return (
    <Box
      gap={2}
      sx={{
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 3,
      }}
    >
      <Avatar
        src="/public/crying-pikachu.gif"
        alt="Crying Pikachu"
        sx={{ width: 90, height: 90 }}
      />

      <Typography variant="h6" textAlign="center">
        Oops! Error loading Pokémon data
      </Typography>

      <Button color="error" variant="outlined" onClick={() => navigate(0)}>
        Try again!
      </Button>
    </Box>
  );
}
