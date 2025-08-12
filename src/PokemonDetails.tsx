import { useState, type SyntheticEvent } from "react";
import { useParams } from "react-router";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import { useFetch } from "@/hooks/useFetch";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Snackbar, { type SnackbarCloseReason } from "@mui/material/Snackbar";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CircularProgress from "@mui/material/CircularProgress";

import { getPokemonTypeColor } from "@/helpers/pokemonColor";

import Box from "@mui/material/Box";

import useCollectionStore from "@/store/collectionStore";

function PokemonDetails() {
  const { addPokemon, removePokemon, isPokemonCaptured } = useCollectionStore();
  const { name } = useParams();
  const [open, setOpen] = useState(false);
  const [actionMessage, setActionMessage] = useState("");
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [isAttemptingCatch, setIsAttemptingCatch] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  const { data, error } = useFetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  const { data: speciesData, error: speciesError } = useFetch(
    `https://pokeapi.co/api/v2/pokemon-species/${name}`
  );

  if (error || speciesError) return <div>Error loading Pokemon details</div>;
  if (!data || !speciesData) return <div>Loading...</div>;

  const handleClose = (
    _event: SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const typeNames = data.types.map((type) => type.type.name);

  const getCleanFlavorText = () => {
    const englishEntry = speciesData.flavor_text_entries.find(
      (entry) => entry.language.name === "en"
    );
    const flavorText = englishEntry?.flavor_text || "";
    return flavorText
      .replace(/\n/g, " ")
      .replace(/\f/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  };

  const handleCapturePokemon = async () => {
    if (isPokemonCaptured(data.id)) {
      setConfirmDialogOpen(true);
    } else {
      setIsAttemptingCatch(true);
      setIsShaking(true);

      setTimeout(() => {
        setIsShaking(false);

        const catchSuccess = Math.random() >= 0.6;

        if (catchSuccess) {
          addPokemon({
            id: data.id,
            name: data.name,
            sprites: data.sprites,
          });
          setActionMessage("Pokemon captured!");
        } else {
          setActionMessage("Pokemon escaped! Try again.");
        }

        setIsAttemptingCatch(false);
        setOpen(true);
      }, 3000);
    }
  };

  const handleConfirmRelease = () => {
    removePokemon({ id: data.id });
    setActionMessage("Pokemon released!");
    setConfirmDialogOpen(false);
    setOpen(true);
  };

  const handleCancelRelease = () => {
    setConfirmDialogOpen(false);
  };

  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          width: "100vw",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 3,
          background: `linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), ${getPokemonTypeColor(
            typeNames
          )}`,
        }}
      >
        <Box sx={{ mb: "-2rem", zIndex: 1 }}>
          <img
            src={data.sprites.other.dream_world.front_default}
            alt={data.name}
            style={{
              width: "10rem",
              height: "10rem",
              animation: isShaking ? "shake 0.3s infinite" : "none",
            }}
          />
        </Box>

        <Card
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: { xs: "100%", sm: 400, md: 500 },
          }}
        >
          <Stack direction="row" spacing={1} mt={2}>
            {data.types.map((type) => (
              <Chip
                key={type.type.name}
                label={type.type.name}
                sx={{
                  backgroundColor: getPokemonTypeColor(type.type.name),
                  color: "white",
                }}
              />
            ))}
          </Stack>

          <Typography
            variant="body1"
            sx={{ fontWeight: "bold", textTransform: "capitalize" }}
            mt="0.5rem"
            color={getPokemonTypeColor(typeNames)}
          >
            About {data.name}
          </Typography>

          <Typography variant="body2" color="text.secondary" textAlign="center">
            {getCleanFlavorText()}
          </Typography>

          <Button
            sx={{
              mt: 2,
              borderColor: isPokemonCaptured(data.id)
                ? "red"
                : getPokemonTypeColor(typeNames),
              color: isPokemonCaptured(data.id)
                ? "red"
                : getPokemonTypeColor(typeNames),
            }}
            variant="outlined"
            onClick={handleCapturePokemon}
            disabled={isAttemptingCatch}
            startIcon={
              isAttemptingCatch ? (
                <CircularProgress
                  size={16}
                  sx={{ color: getPokemonTypeColor(typeNames) }}
                />
              ) : null
            }
          >
            {isAttemptingCatch
              ? "Catching"
              : isPokemonCaptured(data.id)
              ? "Release"
              : "Catch"}{" "}
            Pokemon
          </Button>

          <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <Alert
              onClose={handleClose}
              severity={actionMessage.includes("escaped") ? "error" : "success"}
              variant="filled"
              sx={{ width: "100%", mb: "2rem" }}
            >
              {actionMessage}
            </Alert>
          </Snackbar>
        </Card>
      </Box>

      <Dialog
        open={confirmDialogOpen}
        onClose={handleCancelRelease}
        aria-labelledby="release-dialog-title"
        aria-describedby="release-dialog-description"
      >
        <DialogTitle
          id="release-dialog-title"
          sx={{ textTransform: "capitalize" }}
        >
          Release {data.name}?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="release-dialog-description">
            Are you sure you want to release {data.name}? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelRelease} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleConfirmRelease}
            color="error"
            variant="contained"
            autoFocus
          >
            Release
          </Button>
        </DialogActions>
      </Dialog>

      <style>{`
        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-5px);
          }
          75% {
            transform: translateX(5px);
          }
        }
      `}</style>
    </>
  );
}

export default PokemonDetails;
