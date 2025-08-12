import { useState, type SyntheticEvent } from "react";
import { useParams } from "react-router";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Snackbar, { type SnackbarCloseReason } from "@mui/material/Snackbar";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Error from "@/components/Error";
import Loading from "@/components/Loading";

import { getPokemonTypeColor } from "@/helpers/pokemonColor";
import ConfirmationModal from "@/components/ConfirmationModal";
import usePokemonStore from "@/stores/pokemonStore";
import useCollectionStore from "@/stores/collectionStore";

function PokemonDetails() {
  const { addPokemon, removePokemon, isPokemonCaptured } = useCollectionStore();
  const { usePokemonDetails } = usePokemonStore();
  const { name } = useParams();

  const [open, setOpen] = useState(false);
  const [actionMessage, setActionMessage] = useState("");
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [isAttemptingCatch, setIsAttemptingCatch] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  const {
    data,
    error,
    isLoading: detailsLoading,
  } = usePokemonDetails(name || "");

  if (error) return <Error />;
  if (detailsLoading || !data) return <Loading />;

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
            src={
              data.sprites.other.dream_world.front_default ||
              "https://img.pokemondb.net/sprites/home/normal/unown-a.png"
            }
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
            variant="h4"
            sx={{ fontWeight: "bold", textTransform: "capitalize" }}
            mt="0.5rem"
            color={getPokemonTypeColor(typeNames)}
          >
            {data.name}
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

      <ConfirmationModal
        open={confirmDialogOpen}
        onClose={handleCancelRelease}
        onConfirm={handleConfirmRelease}
        title={`Release ${data.name}?`}
        description={`Are you sure you want to release ${data.name}? This action cannot be undone.`}
        confirmText="Release"
        cancelText="Cancel"
      />

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
