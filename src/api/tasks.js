import axios from "axios";

const BASE_URL = "https://listyantidewi.pythonanywhere.com/tasks";

// semua tugas
export const getTasks = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Gagal mengambil tugas:", error);
    return [];
  }
};

// enambah tugas 
export const addTask = async (taskData) => {
  try {
    const response = await axios.post(BASE_URL, taskData);
    return response.data;
  } catch (error) {
    console.error("Gagal menambahkan tugas:", error);
    throw error;
  }
};

// edit tugas
export const editTask = async (taskId, updatedTask) => {
  try {
    const response = await axios.put(`${BASE_URL}/${taskId}`, updatedTask);
    return response.data;
  } catch (error) {
    console.error("Gagal mengedit tugas:", error);
    throw error;
  }
};

// status tugas (complete / not complete)
export const updateTaskStatus = async (taskId, newStatus) => {
  try {
    const response = await axios.patch(`${BASE_URL}/${taskId}`, { status: newStatus });
    return response.data;
  } catch (error) {
    console.error("Gagal memperbarui status tugas:", error);
    throw error;
  }
};

//hapus tugas 
export const deleteTask = async (taskId) => {
  try {
    await axios.delete(`${BASE_URL}/${taskId}`);
  } catch (error) {
    console.error("Gagal menghapus tugas:", error);
    throw error;
  }
};
