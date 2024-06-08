import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Box,
  Typography,
  Grid,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import authApi from "../api/authApi";
import userApi from "../api/userApi";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [usernameErrText, setUsernameErrText] = useState("");
  const [passwordErrText, setPasswordErrText] = useState("");
  const [confirmPasswordErrText, setConfirmPasswordErrText] = useState("");

  const fetchUsers = async () => {
    try {
      const usersData = await userApi.getAll();
      setUsers(usersData);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddUser = async () => {
    setUsernameErrText("");
    setPasswordErrText("");
    setConfirmPasswordErrText("");

    const username = newUser.username.trim();
    const password = newUser.password.trim();
    const confirmPassword = newUser.confirmPassword.trim();

    let err = false;

    if (username === "") {
      err = true;
      setUsernameErrText("Please fill this field");
    }
    if (password === "") {
      err = true;
      setPasswordErrText("Please fill this field");
    }
    if (confirmPassword === "") {
      err = true;
      setConfirmPasswordErrText("Please fill this field");
    }
    if (password !== confirmPassword) {
      err = true;
      setConfirmPasswordErrText("Confirm password not match");
    }

    if (err) return;

    setLoading(true);

    try {
      const res = await authApi.signup({
        username,
        password,
        confirmPassword,
      });
      setLoading(false);
      // Refresh the user list to include the newly added user
      fetchUsers();
      setNewUser({ username: "", password: "", confirmPassword: "" });
    } catch (err) {
      const errors = err.data.errors;
      errors.forEach((e) => {
        if (e.param === "username") {
          setUsernameErrText(e.msg);
        }
        if (e.param === "password") {
          setPasswordErrText(e.msg);
        }
        if (e.param === "confirmPassword") {
          setConfirmPasswordErrText(e.msg);
        }
      });
      setLoading(false);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await userApi.delete(id);
      fetchUsers(); // Refresh the user list after deletion
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  const handleUpdateUser = async (id, username) => {
    try {
      await userApi.update(id, { username });
      fetchUsers(); // Refresh the user list after update
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Manage Users
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>
                  <TextField
                    value={user.username}
                    onChange={(e) => handleUpdateUser(user.id, e.target.value)}
                    fullWidth
                  />
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleDeleteUser(user.id)}
                    color="secondary"
                    variant="contained"
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box mt={3}>
        <Typography variant="h6">Add New User</Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={4}>
            <TextField
              label="Username"
              value={newUser.username}
              onChange={(e) =>
                setNewUser({ ...newUser, username: e.target.value })
              }
              fullWidth
              error={usernameErrText !== ""}
              helperText={usernameErrText}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Password"
              type="password"
              value={newUser.password}
              onChange={(e) =>
                setNewUser({ ...newUser, password: e.target.value })
              }
              fullWidth
              error={passwordErrText !== ""}
              helperText={passwordErrText}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Confirm Password"
              type="password"
              value={newUser.confirmPassword}
              onChange={(e) =>
                setNewUser({ ...newUser, confirmPassword: e.target.value })
              }
              fullWidth
              error={confirmPasswordErrText !== ""}
              helperText={confirmPasswordErrText}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <LoadingButton
              onClick={handleAddUser}
              variant="contained"
              color="primary"
              fullWidth
              loading={loading}
            >
              Add User
            </LoadingButton>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ManageUsers;
