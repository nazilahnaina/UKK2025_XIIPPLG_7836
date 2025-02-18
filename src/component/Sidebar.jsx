import React from "react";
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar } from "@mui/material";
import { FormatListBulleted, AccountCircle } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

export default function Sidebar() {
  const navigate = useNavigate();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
      }}
    >
      <Toolbar />
      <List>
        <ListItem
          button
          onClick={() => navigate("/tasks")}
          sx={{ "&:hover": { backgroundColor: "#6A80B9", color: "white" } }}
        >
          <ListItemIcon sx={{ color: "inherit" }}>
            <FormatListBulleted />
          </ListItemIcon>
          <ListItemText primary="Tasks" />
        </ListItem>

        <ListItem
          button
          onClick={() => navigate("/profil")}
          sx={{ "&:hover": { backgroundColor: "#6A80B9", color: "white" } }}
        >
          <ListItemIcon sx={{ color: "inherit" }}>
            <AccountCircle />
          </ListItemIcon>
          <ListItemText primary="Profil" />
        </ListItem>
      </List>
    </Drawer>
  );
}
