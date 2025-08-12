import { useState } from "react";
import { useNavigate } from "react-router";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";
import FolderCopyIcon from "@mui/icons-material/FolderCopy";

export default function TopBar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{ backgroundColor: "#DC0A2D", boxShadow: "none" }}
      >
        <Toolbar variant="dense">
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Pokédex
          </Typography>
        </Toolbar>

        <Drawer
          open={open}
          onClose={toggleDrawer(false)}
          sx={{
            "& .MuiDrawer-paper": {
              backgroundColor: "#DC0A2D",
            },
          }}
        >
          <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
          >
            <List sx={{ color: "white" }}>
              <ListItem disablePadding onClick={() => navigate("/")}>
                <ListItemButton>
                  <ListItemIcon sx={{ color: "white" }}>
                    <CatchingPokemonIcon />
                  </ListItemIcon>
                  <ListItemText primary="All Pokémon" />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding onClick={() => navigate("/collection")}>
                <ListItemButton>
                  <ListItemIcon sx={{ color: "white" }}>
                    <FolderCopyIcon />
                  </ListItemIcon>
                  <ListItemText primary="Your Collection" />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        </Drawer>
      </AppBar>
    </Box>
  );
}
