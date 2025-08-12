import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter } from "react-router";
import CssBaseline from "@mui/material/CssBaseline";
import TopBar from "@/components/TopBar";
import { AppRoutes } from "@/routes";
import pokedex from "@/themes/pokedex";

import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/700.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter basename="/pokedex">
      <ThemeProvider theme={pokedex}>
        <CssBaseline />
        <TopBar />
        <AppRoutes />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
