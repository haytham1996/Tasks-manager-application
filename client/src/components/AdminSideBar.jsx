import React from "react";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";

const AdminSidebar = () => (
  <Box sx={{ width: 240, bgcolor: "grey.800", color: "white", p: 2 }}>
    <Box sx={{ mb: 2 }}>
      <Link
        to="/admin/tasks"
        style={{ color: "white", textDecoration: "none" }}
      >
        View Tasks
      </Link>
    </Box>
    <Box>
      <Link
        to="/admin/users"
        style={{ color: "white", textDecoration: "none" }}
      >
        Manage Users
      </Link>
    </Box>
  </Box>
);

export default AdminSidebar;
