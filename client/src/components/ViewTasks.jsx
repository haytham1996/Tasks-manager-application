import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
} from "@mui/material";
import taskApi from "../api/taskApi";

const ViewTasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getAllTasks = async () => {
      const res = await taskApi.getAll();
      setTasks(res);
    };

    getAllTasks();
  }, []);
  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        View Tasks
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Board</TableCell>
              <TableCell>Section</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>User</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell>{task._id}</TableCell>
                <TableCell>{task.board}</TableCell>
                <TableCell>{task.section}</TableCell>
                <TableCell>{task.title}</TableCell>
                <TableCell>{task.username}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ViewTasks;
