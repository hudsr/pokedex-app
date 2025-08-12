import { useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useFetch } from "@/hooks/useFetch";

import { red, green } from "@mui/material/colors";

import { useNavigate } from "react-router";
import useCollectionStore from "./store/collectionStore";

import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import ClearIcon from "@mui/icons-material/Clear";
import LoadingState from "@/components/LoadingState";

interface Pokemon {
  name: string;
  url: string;
}

function App() {
  const navigate = useNavigate();
  const { isPokemonCaptured } = useCollectionStore();
  const [searchTerm, setSearchTerm] = useState("");

  const { data, error, isLoading } = useFetch(
    "https://pokeapi.co/api/v2/pokemon?limit=1400"
  );

  const handleReset = () => {
    setSearchTerm("");
  };

  if (isLoading) return <LoadingState />;
  if (error)
    return <Typography variant="h3">Error: {error.message}</Typography>;

  const filteredPokemon = searchTerm.trim()
    ? data.results.filter((pokemon: Pokemon) =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : data.results;

  const pokemonList = filteredPokemon.slice(0, 30);

  return (
    <>
      <Box p={3} mt={6}>
        <Typography
          variant="h5"
          component="h1"
          sx={{ fontWeight: "bold", mb: 2 }}
        >
          Pokémon List
        </Typography>

        <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
          <Paper
            component="form"
            sx={{
              p: "0.5rem 0.5rem",
              display: "flex",
              alignItems: "center",
              flex: 1,
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search by name (e.g., bulbasaur)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              inputProps={{ "aria-label": "search pokemon" }}
            />
          </Paper>

          {searchTerm && (
            <Button
              variant="outlined"
              onClick={handleReset}
              startIcon={<ClearIcon />}
              sx={{ whiteSpace: "nowrap" }}
            >
              Reset
            </Button>
          )}
        </Box>

        {searchTerm && pokemonList.length === 0 && (
          <Typography variant="body2" color="error" sx={{ mb: 2 }}>
            No Pokemon found matching "{searchTerm}". Try another name.
          </Typography>
        )}

        <Grid
          container
          mt={3}
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 2, sm: 12, md: 18 }}
        >
          {pokemonList.map((pokemon: Pokemon, index: number) => {
            const getPokemonId = (url: string) => {
              const segments = url.split("/");
              return parseInt(segments[segments.length - 2]);
            };

            const pokemonId = getPokemonId(pokemon.url);
            const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;

            return (
              <Grid key={index} size={{ xs: 2, sm: 4, md: 3 }}>
                <Card
                  sx={{
                    borderRadius: 2,
                  }}
                  onClick={() => navigate(`/pokemon/${pokemon.name}`)}
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
                      image={imageUrl}
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
                      {pokemon.name}
                    </Typography>
                  </CardActionArea>

                  <Button
                    color={isPokemonCaptured(pokemonId) ? "success" : "error"}
                    sx={{
                      borderColor: isPokemonCaptured(pokemonId)
                        ? "green.300"
                        : "#DC0A2D",
                      color: isPokemonCaptured(pokemonId) ? "green" : "#DC0A2D",
                      backgroundColor: isPokemonCaptured(pokemonId)
                        ? green[50]
                        : red[50],
                    }}
                    size="small"
                    fullWidth
                  >
                    {isPokemonCaptured(pokemonId) ? "Captured" : "Not captured"}
                  </Button>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </>
  );
}

export default App;
