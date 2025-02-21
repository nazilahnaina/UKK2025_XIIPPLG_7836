import React, { useState } from "react";
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Box } from "@mui/material";
import { Add, Edit, Delete, Undo } from "@mui/icons-material";
import Layout from "./Layout";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const PageTasks = () => {
  const [categories, setCategories] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [editingCategory, setEditingCategory] = useState(null);
  const [openCategoryDialog, setOpenCategoryDialog] = useState(false);
  const [newTask, setNewTask] = useState({ name: "", category: "", status: "Pending" });
  const [openTaskDialog, setOpenTaskDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [openEditCategoryDialog, setOpenEditCategoryDialog] = useState(false);

  const addCategory = () => {
    if (newCategory.trim()) {
      setCategories([...categories, newCategory]);
      setNewCategory("");
      setOpenCategoryDialog(false);
    }
  };

  const deleteCategory = (category) => {
    setCategories(categories.filter((cat) => cat !== category));
  };

  const editCategory = () => {
    setCategories(categories.map((cat) => (cat === editingCategory.old ? editingCategory.new : cat)));
    setEditingCategory(null);
    setOpenEditCategoryDialog(false);
  };


  const addTask = () => {
    if (newTask.name.trim() && newTask.category) {
      setTasks([...tasks, { ...newTask, id: Date.now() }]);
      setNewTask({ name: "", category: "", status: "Pending" });
      setOpenTaskDialog(false);
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleStatus = (id) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, status: task.status === "Completed" ? "Pending" : "Completed" } : task)));
  };
  const handlePrintPDF = () => {
    const doc = new jsPDF();
    doc.text("Laporan To-Do List", 14, 10);

    const tableColumn = ["Tugas", "Kategori", "Status", "Prioritas"];
    const tableRows = [];

    filteredTasks.forEach((task) => {
      const taskData = [task.title, task.category, task.status, task.difficulty];
      tableRows.push(taskData);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save("To-Do_List_Report.pdf");
  };

  return (
    <Layout>
      <div style={{ padding: 20 }}>
        <h2>Tasks</h2>
        <div style={{ display: "flex", gap: 10 }}>
          <TextField label="Add Category" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} />
          <Button variant="contained" onClick={addCategory} style={{ backgroundColor: "#6A80B9", color: "white" }}>Add Category</Button>
        </div>
        <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
          {categories.map((category, index) => (
            <Paper key={index} style={{ padding: 10, display: "flex", alignItems: "center" }}>
              {category}
              <IconButton onClick={() => { setEditingCategory({ old: category, new: category }); setOpenEditCategoryDialog(true); }}>
              <Edit />
            </IconButton>
              <IconButton onClick={() => deleteCategory(category)}><Delete /></IconButton>
            </Paper>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 20 }}>
          <Button variant="contained" onClick={() => setOpenTaskDialog(true)} style={{ backgroundColor: "#6A80B9", color: "white" }}>Add Task</Button>
          <TextField label="Search Task" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>

        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <Button
            variant="contained"
            color="secondary"
            size="medium"
            onClick={handlePrintPDF}
            sx={{ py: 1, px: 3 }}
          >
            🖨 Cetak PDF
          </Button>
        </Box>

        <TableContainer component={Paper} style={{ marginTop: 20 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Task</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks.filter(task => task.name.toLowerCase().includes(searchTerm.toLowerCase())).map((task) => (
                <TableRow key={task.id}>
                  <TableCell>{task.name}</TableCell>
                  <TableCell>{task.category}</TableCell>
                  <TableCell>{task.status}</TableCell>
                  <TableCell>
                    <IconButton><Edit /></IconButton>
                    <IconButton onClick={() => deleteTask(task.id)}><Delete /></IconButton>
                    <IconButton onClick={() => toggleStatus(task.id)}><Undo /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog open={openTaskDialog} onClose={() => setOpenTaskDialog(false)}>
          <DialogTitle>Add Task</DialogTitle>
          <DialogContent>
            <TextField label="Task Name" fullWidth value={newTask.name} onChange={(e) => setNewTask({ ...newTask, name: e.target.value })} />
            <Select fullWidth value={newTask.category} onChange={(e) => setNewTask({ ...newTask, category: e.target.value })} style={{ marginTop: 10 }}>
              {categories.map((category, index) => (
                <MenuItem key={index} value={category}>{category}</MenuItem>
              ))}
            </Select>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenTaskDialog(false)}>Cancel</Button>
            <Button variant="contained" onClick={addTask} style={{ backgroundColor: "#6A80B9", color: "white" }}>Add</Button>
          </DialogActions>
        </Dialog>
        
        <Dialog open={openEditCategoryDialog} onClose={() => setOpenEditCategoryDialog(false)}>
        <DialogTitle>Edit Category</DialogTitle>
        <DialogContent>
          <TextField label="Category Name" fullWidth value={editingCategory?.new || ""} onChange={(e) => setEditingCategory({ ...editingCategory, new: e.target.value })} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditCategoryDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={editCategory} style={{ backgroundColor: "#6A80B9", color: "white" }}>Save</Button>
        </DialogActions>
      </Dialog>
      </div>
    </Layout>
  );
};

export default PageTasks;
