import { Routes, Route } from "react-router";
import App from "@/App";
import PokemonCollection from "@/PokemonCollection";
import PokemonDetails from "@/PokemonDetails";
import Feedback from "@/components/Feedback";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/collection" element={<PokemonCollection />} />
      <Route path="/pokemon/:name" element={<PokemonDetails />} />
      <Route
        path="*"
        element={
          <Feedback
            imageUrl="/crying-pikachu.gif"
            imageAlt="Page not found"
            message="Page not found"
            navigationMessage="Go to list"
            link="/"
          />
        }
      />
    </Routes>
  );
}
