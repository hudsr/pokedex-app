import { useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import { red } from "@mui/material/colors";

import Feedback from "@/components/Feedback";
import ConfirmationModal from "@/components/ConfirmationModal";

import useCollectionStore from "./store/collectionStore";
import Button from "@mui/material/Button";

interface Pokemon {
  id: number;
  name?: string;
  sprites?: {
    other: {
      dream_world: {
        front_default: string;
        front_female: string | null;
      };
    };
  };
}

function Collection() {
  const { capturedPokemons, removePokemon } = useCollectionStore();
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

  if (capturedPokemons.length === 0) {
    return (
      <Feedback
        imageUrl="/crying-pikachu.gif"
        imageAlt="No captured Pokémon"
        message="No captured Pokémon"
        navigationMessage="Go to list"
        link="/"
      />
    );
  }

  const handleReleaseClick = (pokemon: Pokemon) => {
    setSelectedPokemon(pokemon);
    setConfirmDialogOpen(true);
  };

  const handleConfirmRelease = () => {
    if (selectedPokemon) {
      removePokemon(selectedPokemon);
    }
    setConfirmDialogOpen(false);
    setSelectedPokemon(null);
  };

  const handleCancelRelease = () => {
    setConfirmDialogOpen(false);
    setSelectedPokemon(null);
  };

  return (
    <>
      <Box p={3} mt={6}>
        <Typography
          variant="h5"
          component="h1"
          sx={{ fontWeight: "bold", mb: 2 }}
        >
          Pokémon Collection
        </Typography>

        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 2, sm: 12, md: 18 }}
        >
          {capturedPokemons.map((pokemon: Pokemon) => (
            <Grid key={pokemon.id} size={{ xs: 2, sm: 4, md: 3 }}>
              <Card
                sx={{
                  borderRadius: 2,
                }}
              >
                <CardActionArea
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    p: 2,
                  }}
                >
                  <CardMedia
                    component="img"
                    height="100"
                    image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
                    alt={pokemon.name}
                    sx={{
                      objectFit: "contain",
                      maxWidth: "100px",
                    }}
                  />

                  <Typography
                    variant="h6"
                    component="h2"
                    align="center"
                    fontSize="1rem"
                    sx={{ textTransform: "capitalize" }}
                  >
                    {pokemon.name || "Unknown"}
                  </Typography>
                </CardActionArea>

                <Button
                  color="error"
                  sx={{
                    borderColor: "#DC0A2D",
                    color: "#DC0A2D",
                    backgroundColor: red[50],
                  }}
                  size="small"
                  fullWidth
                  onClick={() => handleReleaseClick(pokemon)}
                >
                  Release
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <ConfirmationModal
        open={confirmDialogOpen}
        onClose={handleCancelRelease}
        onConfirm={handleConfirmRelease}
        title={`Release ${selectedPokemon?.name}?`}
        description={`Are you sure you want to release ${selectedPokemon?.name}? This action cannot be undone.`}
        confirmText="Release"
        cancelText="Cancel"
      />
    </>
  );
}

export default Collection;
