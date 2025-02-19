import React, { useEffect, useState } from "react";
import { Container, Grid, Card, CardContent, Typography, IconButton, Button, Snackbar, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { getTasks, addTask, editTask, deleteTask } from "../api/tasks";
import { getCategories, addCategory } from "../api/category";
import { indigo, dark, succes, danger } from "../theme/color";
import Layout from "./layout";

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openCategoryDialog, setOpenCategoryDialog] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [openTaskDialog, setOpenTaskDialog] = useState(false);
  const [taskDetails, setTaskDetails] = useState({ task: "", category_id: "", id: null });
  const [selectedTasks, setSelectedTasks] = useState([]); // Untuk menampung task yang dipilih

  useEffect(() => {
    fetchTasks();
    fetchCategories();
  }, []);

  const fetchTasks = async () => {
    const data = await getTasks();
    setTasks(data);
  };

  const fetchCategories = async () => {
    const data = await getCategories();
    setCategories(data);
  };

  const handleAddTask = async () => {
    if (taskDetails.task) {
      await addTask({ task: taskDetails.task, category_id: taskDetails.category_id, user_id: 1 });
      fetchTasks();
      setOpenSnackbar(true);
      setOpenTaskDialog(false);
    }
  };

  const handleEditTask = async () => {
    if (taskDetails.task) {
      await editTask(taskDetails.id, { task: taskDetails.task, category_id: taskDetails.category_id });
      fetchTasks();
      setOpenSnackbar(true);
      setOpenTaskDialog(false);
    }
  };

  const handleDeleteTask = async (id) => {
    await deleteTask(id);
    fetchTasks();
  };

  const handleAddCategory = async () => {
    if (newCategory) {
      await addCategory({ name: newCategory });
      fetchCategories();
      setOpenCategoryDialog(false);
      setOpenSnackbar(true);
    }
  };

  const handleToggleSelectTask = (taskId) => {
    setSelectedTasks((prevSelectedTasks) => {
      if (prevSelectedTasks.includes(taskId)) {
        return prevSelectedTasks.filter((id) => id !== taskId); // Deselect task
      } else {
        return [...prevSelectedTasks, taskId]; // Select task
      }
    });
  };

  return (
    <Layout>
      <Container>
        <Typography variant="h4" style={{ color: indigo[400], fontWeight: "bold", marginBottom: 15 }}>
          Tasks
        </Typography>

        <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
          <Button
            variant="contained"
            onClick={() => setOpenCategoryDialog(true)}
            style={{ backgroundColor: indigo[400], color: "white" }}
          >
            Add Category
          </Button>

          <Button
            variant="contained"
            onClick={() => setOpenTaskDialog(true)}
            style={{ backgroundColor: indigo[400], color: "white" }}
          >
            Add Task
          </Button>
        </div>

        {/* Tasks Table */}
        <Typography variant="h5" style={{ color: indigo[400], fontWeight: "bold", marginTop: 40, marginBottom: 15 }}>
          All Tasks
        </Typography>

        <TableContainer component={Paper} style={{ marginBottom: 40 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Checkbox
                    checked={selectedTasks.length === tasks.length}
                    onChange={() => {
                      if (selectedTasks.length === tasks.length) {
                        setSelectedTasks([]); // Deselect all
                      } else {
                        setSelectedTasks(tasks.map((task) => task.id)); // Select all
                      }
                    }}
                  />
                </TableCell>
                <TableCell>Task</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedTasks.includes(task.id)}
                      onChange={() => handleToggleSelectTask(task.id)}
                    />
                  </TableCell>
                  <TableCell>{task.task}</TableCell>
                  <TableCell>{categories.find((category) => category.id === task.category_id)?.name || "N/A"}</TableCell>
                  <TableCell>{task.status ? "Completed" : "Pending"}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => {
                      setTaskDetails({ task: task.task, category_id: task.category_id, id: task.id });
                      setOpenTaskDialog(true);
                    }}>
                      <Edit style={{ color: succes[100] }} />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteTask(task.id)}>
                      <Delete style={{ color: danger[100] }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Snackbar for notifications */}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={() => setOpenSnackbar(false)}
          message="Action Successful!"
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        />

        {/* Task Dialog */}
        <Dialog open={openTaskDialog} onClose={() => setOpenTaskDialog(false)}>
          <DialogTitle>{taskDetails.id ? "Edit Task" : "Add Task"}</DialogTitle>
          <DialogContent>
            <TextField
              label="Task Name"
              fullWidth
              value={taskDetails.task}
              onChange={(e) => setTaskDetails({ ...taskDetails, task: e.target.value })}
              style={{ marginBottom: 20 }}
            />
            <TextField
              label="Category"
              select
              fullWidth
              value={taskDetails.category_id}
              onChange={(e) => setTaskDetails({ ...taskDetails, category_id: e.target.value })}
              SelectProps={{
                native: true,
              }}
              style={{ marginBottom: 20 }}
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </TextField>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenTaskDialog(false)} color="primary">
              Cancel
            </Button>
            <Button onClick={taskDetails.id ? handleEditTask : handleAddTask} color="primary">
              {taskDetails.id ? "Save Changes" : "Add Task"}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Category Dialog */}
        <Dialog open={openCategoryDialog} onClose={() => setOpenCategoryDialog(false)}>
          <DialogTitle>Add New Category</DialogTitle>
          <DialogContent>
            <TextField
              label="Category Name"
              fullWidth
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              style={{ marginBottom: 20 }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenCategoryDialog(false)} color="primary">
              Cancel
            </Button>
            <Button onClick={handleAddCategory} color="primary">
              Add Category
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Layout>
  );
};

export default TodoApp;
