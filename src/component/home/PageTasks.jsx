import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  TextField,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Divider,
  Tooltip
} from "@mui/material";
import { Add, Edit, Delete, CheckCircle, RadioButtonUnchecked } from "@mui/icons-material";
import Layout from "./layout";

// const API_URL = "https://listyantidewi.pythonanywhere.com";

export default function Tasks() {
  const [categories, setCategories] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [openCategoryDialog, setOpenCategoryDialog] = useState(false);

  useEffect(() => {
    fetchCategories();
    fetchTasks();
  }, []);

  const fetchCategories = async () => {
    const response = await axios.get(`$https://listyantidewi.pythonanywhere.com/categories`);
    setCategories(response.data);
  };

  const fetchTasks = async () => {
    const response = await axios.get(`$`);
    setTasks(response.data);
  };

  const handleAddCategory = async () => {
    if (newCategory.trim() !== "") {
      await axios.post(`${API_URL}/categories`, { category: newCategory });
      fetchCategories();
      setNewCategory("");
      setOpenCategoryDialog(false);
    }
  };

  const handleAddTask = async () => {
    if (newTask.trim() !== "" && selectedCategory !== "") {
      await axios.post(`${API_URL}/tasks`, { category_id: selectedCategory, task: newTask, status: "not complete" });
      fetchTasks();
      setNewTask("");
    }
  };

  const handleToggleTaskStatus = async (task) => {
    const updatedStatus = task.status === "complete" ? "not complete" : "complete";
    await axios.put(`${API_URL}/tasks/${task.id}`, { status: updatedStatus });
    fetchTasks();
  };

  const handleDeleteTask = async (id) => {
    await axios.delete(`$https://listyantidewi.pythonanywhere.com/tasks/tasks/${id}`);
    fetchTasks();
  };

  return (
    <Layout>
      <Box sx={{ ml: 2, mt: 2, maxWidth: "90%" }}>
        <Typography variant="h5" fontWeight="bold">Tugas</Typography>
        
        <Grid container spacing={1} alignItems="center" sx={{ mt: 1 }}>
          <Grid item>
            <Button variant="contained" size="small" onClick={() => setOpenCategoryDialog(true)} sx={{ background: "#6A80B9" }}>
              Tambah Kategori
            </Button>
          </Grid>
        </Grid>

        <Grid container spacing={1} alignItems="center" sx={{ mt: 2 }}>
          <Grid item xs={5}>
            <TextField
              label="Tambahkan Tugas"
              variant="outlined"
              size="small"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              fullWidth
            />
          </Grid>

          <Grid item xs={4}>
            <Select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              displayEmpty
              fullWidth
              size="small"
            >
              <MenuItem value="" disabled>Pilih Kategori</MenuItem>
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>{category.category}</MenuItem>
              ))}
            </Select>
          </Grid>

          <Grid item xs={3}>
            <Button variant="contained" size="small" startIcon={<Add />} onClick={handleAddTask} sx={{ background: "#6A80B9" }}>
              Tambah
            </Button>
          </Grid>
        </Grid>

        <List sx={{ mt: 2 }}>
          {tasks.map((task) => (
            <React.Fragment key={task.id}>
              <ListItem
                secondaryAction={
                  <>
                    <Tooltip title={`Tandai sebagai ${task.status === 'complete' ? 'Belum Selesai' : 'Selesai'}`}>
                      <IconButton size="small" onClick={() => handleToggleTaskStatus(task)}>
                        {task.status === "complete" ? <CheckCircle color="success" /> : <RadioButtonUnchecked />}
                      </IconButton>
                    </Tooltip>
                    <IconButton size="small" onClick={() => handleDeleteTask(task.id)}><Delete fontSize="small" /></IconButton>
                  </>
                }
              >
                <ListItemText primary={task.task} secondary={categories.find(cat => cat.id === task.category_id)?.category} />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </Box>

      <Dialog open={openCategoryDialog} onClose={() => setOpenCategoryDialog(false)}>
        <DialogTitle>Tambah Kategori</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Nama Kategori"
            fullWidth
            variant="outlined"
            size="small"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCategoryDialog(false)} size="small">Batal</Button>
          <Button onClick={handleAddCategory} variant="contained" size="small" sx={{ background: "#6A80B9" }}>
            Tambah
          </Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
}
