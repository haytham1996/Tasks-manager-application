import React from "react";
import { Link } from "react-router-dom";
import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";

const AdminSidebar = () => (
  <Box
    sx={{
      height: "100vh",
      width: 240,
      bgcolor: "grey.900",
      color: "white",
      display: "flex",
      flexDirection: "column",
      p: 2,
    }}
  >
    <Typography variant="h6" gutterBottom>
      Admin Panel
    </Typography>
    <List>
      <ListItem button component={Link} to="/admin/tasks">
        <ListItemText primary="View Tasks" sx={{ color: "white" }} />
      </ListItem>
      <ListItem button component={Link} to="/admin/users">
        <ListItemText primary="Manage Users" sx={{ color: "white" }} />
      </ListItem>
    </List>
  </Box>
);

export default AdminSidebar;
