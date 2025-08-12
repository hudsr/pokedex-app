import { useNavigate } from "react-router";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

interface FeedbackProps {
  imageUrl: string;
  imageAlt: string;
  message: string;
  navigationMessage: string;
  link: string;
}

export default function Feedback({
  imageUrl,
  imageAlt,
  message,
  navigationMessage,
  link,
}: FeedbackProps) {
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
      <Avatar src={imageUrl} alt={imageAlt} sx={{ width: 90, height: 90 }} />

      <Typography variant="h6">{message}</Typography>

      <Button color="error" variant="outlined" onClick={() => navigate(link)}>
        {navigationMessage}
      </Button>
    </Box>
  );
}
