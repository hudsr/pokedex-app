import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { red, green } from "@mui/material/colors";
import { useNavigate } from "react-router";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import ClearIcon from "@mui/icons-material/Clear";
import Error from "@/components/Error";
import Loading from "@/components/Loading";

import usePokemonStore from "@/stores/pokemonStore";
import useCollectionStore from "@/stores/collectionStore";

function App() {
  const navigate = useNavigate();
  const { isPokemonCaptured } = useCollectionStore();
  const {
    searchTerm,
    setSearchTerm,
    resetSearch,
    usePokemonList,
    getPokemonId,
    getPokemonImageUrl,
  } = usePokemonStore();

  const { error, isLoading, filteredPokemon, displayedPokemon } =
    usePokemonList();

  if (isLoading) return <Loading />;
  if (error) return <Error />;

  return (
    <Box p={3} mt={6}>
      <Typography variant="h5" component="h1" sx={{ fontWeight: "bold" }}>
        Pokémon List
      </Typography>

      <Typography variant="body2" sx={{ mb: 2 }}>
        {filteredPokemon.length} Pokémon found.{" "}
        {displayedPokemon.length === 0 && "Try another name."}
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
            placeholder="Filter by name (e.g., bulbasaur)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            inputProps={{ "aria-label": "Filter pokemon" }}
          />
        </Paper>

        {searchTerm && (
          <Button
            variant="outlined"
            onClick={resetSearch}
            startIcon={<ClearIcon />}
            sx={{ whiteSpace: "nowrap" }}
          >
            Reset
          </Button>
        )}
      </Box>

      <Grid
        container
        mt={3}
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 2, sm: 12, md: 18 }}
      >
        {displayedPokemon.map((pokemon, index) => {
          const pokemonId = getPokemonId(pokemon.url);
          const imageUrl = getPokemonImageUrl(pokemonId);

          return (
            <Grid key={index} size={{ xs: 2, sm: 4, md: 3 }}>
              <Card
                sx={{ borderRadius: 2 }}
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
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://img.pokemondb.net/sprites/home/normal/unown-a.png";
                    }}
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
  );
}

export default App;
