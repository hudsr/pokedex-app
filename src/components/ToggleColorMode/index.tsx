import { useColorScheme } from "@mui/material/styles";

export default function ToggleColorMode() {
  const { mode, setMode } = useColorScheme();

  if (!mode) {
    return null;
  }

  return (
    <button onClick={() => setMode(mode === "light" ? "dark" : "light")}>
      Toggle {mode === "light" ? "Dark" : "Light"} Mode
    </button>
  );
}
