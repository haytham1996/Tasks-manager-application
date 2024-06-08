import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";

import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

const AdminSidebar = () => {
  const user = useSelector((state) => state.user.value);
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
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
        <ListItem>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="body2" fontWeight="700">
              {user.username}
            </Typography>
            <IconButton onClick={logout}>
              <LogoutOutlinedIcon fontSize="small" />
            </IconButton>
          </Box>
        </ListItem>
        <ListItem button component={Link} to="/admin/tasks">
          <ListItemText primary="View Tasks" sx={{ color: "white" }} />
        </ListItem>
        <ListItem button component={Link} to="/admin/users">
          <ListItemText primary="Manage Users" sx={{ color: "white" }} />
        </ListItem>
      </List>
    </Box>
  );
};

export default AdminSidebar;
