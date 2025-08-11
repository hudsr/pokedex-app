import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import pokedex from "@/themes/pokedex";
import App from "./App.tsx";

import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/700.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={pokedex}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>
);
