import { useNavigate } from "react-router";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function EmptyState() {
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
        src="/crying-pikachu.gif"
        alt="Page not found"
        sx={{ width: 90, height: 90 }}
      />

      <Typography variant="h6">Page not found</Typography>

      <Button color="error" variant="outlined" onClick={() => navigate("/")}>
        Go to Home
      </Button>
    </Box>
  );
}
