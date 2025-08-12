import { Routes, Route } from "react-router";
import App from "@/App";
import Collection from "@/Collection";
import Details from "@/Details";
import Feedback from "@/components/Feedback";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/collection" element={<Collection />} />
      <Route path="/pokemon/:name" element={<Details />} />
      <Route
        path="*"
        element={
          <Feedback
            imageUrl="/pokedex/crying-pikachu.gif"
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
