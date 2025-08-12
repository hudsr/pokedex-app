import { Routes, Route } from "react-router";
import App from "@/App";
import PokemonCollection from "@/PokemonCollection";
import PokemonDetails from "@/PokemonDetails";
import EmptyState from "@/components/EmptyState";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/collection" element={<PokemonCollection />} />
      <Route path="/pokemon/:name" element={<PokemonDetails />} />
      <Route path="*" element={<EmptyState />} />
    </Routes>
  );
}
