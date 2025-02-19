import axios from "axios";

const BASE_URL = "https://listyantidewi.pythonanywhere.com/categories";

// semua category
export const getCategories = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Gagal mengambil kategori:", error);
    return [];
  }
};

// menambah category
export const addCategory = async (categoryName, userId) => {
  try {
    const response = await axios.post(BASE_URL, {
      category: categoryName,
      user_id: userId,
    });
    return response.data;
  } catch (error) {
    console.error("Gagal menambahkan kategori:", error);
    throw error;
  }
};

// edit category
export const editCategory = async (categoryId, newCategoryName) => {
  try {
    const response = await axios.put(`${BASE_URL}/${categoryId}`, {
      category: newCategoryName,
    });
    return response.data;
  } catch (error) {
    console.error("Gagal mengedit kategori:", error);
    throw error;
  }
};

// menghapus category
export const deleteCategory = async (categoryId) => {
  try {
    await axios.delete(`${BASE_URL}/${categoryId}`);
  } catch (error) {
    console.error("Gagal menghapus kategori:", error);
    throw error;
  }
};
