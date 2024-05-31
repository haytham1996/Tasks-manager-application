import React, { useEffect, useState } from "react";
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
} from "@mui/material";

const initialUsers = [
  { id: 1, username: "user1" },
  { id: 2, username: "user2" },
  // Add more users as needed
];

const ManageUsers = () => {
  const [users, setUsers] = useState(initialUsers);
  const [newUser, setNewUser] = useState({ username: "", password: "" });

  const handleAddUser = () => {
    const nextId = users.length
      ? Math.max(users.map((user) => user.id)) + 1
      : 1;
    setUsers([...users, { id: nextId, username: newUser.username }]);
    setNewUser({ username: "", password: "" });
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleUpdateUser = (id, username) => {
    setUsers(
      users.map((user) => (user.id === id ? { ...user, username } : user))
    );
  };

  useEffect(() => {
    console.log("users");
  }, []);

  return (
    <Box>
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
                  />
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleDeleteUser(user.id)}
                    color="secondary"
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box mt={2}>
        <TextField
          label="Username"
          value={newUser.username}
          onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
        />
        <TextField
          label="Password"
          type="password"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          sx={{ ml: 1 }}
        />
        <Button
          onClick={handleAddUser}
          variant="contained"
          color="primary"
          sx={{ ml: 1 }}
        >
          Add User
        </Button>
      </Box>
    </Box>
  );
};

export default ManageUsers;
