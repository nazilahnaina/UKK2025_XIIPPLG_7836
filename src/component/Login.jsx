import { useState } from "react";
import { TextField, Button, Container, Typography, Box, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const form = new FormData();
    form.append("username", formData.username);
    form.append("password", formData.password);

    try {
        const response = await fetch("https://listyantidewi.pythonanywhere.com/login", {
            method: "POST",
            body: form,
        });

        const data = await response.json(); // Ubah dari text() ke json()

        if (response.ok) {
            console.log("Login successful:", data);

            // Pastikan data memiliki struktur yang sesuai
            if (Array.isArray(data) && data.length >= 3) {
                const userId = data[1];  // Ambil userId dari array
                const username = data[2]; // Ambil username dari array

                // Simpan di localStorage
                localStorage.setItem("userId", userId);
                localStorage.setItem("username", username);

                navigate("/tasks");
            } else {
                console.error("Unexpected response format:", data);
                setError("Unexpected response format");
            }
        } else {
            setError(data);
            console.error("Login failed:", data);
        }
    } catch (error) {
        setError("Username atau password salah");
        console.error("Error during login:", error);
    }
};

  return (
    <Container maxWidth="sm">
      <Box display="flex" flexDirection="column" alignItems="center" mt={10}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Sign In
        </Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <TextField
            fullWidth
            label="Username"
            variant="outlined"
            margin="normal"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            label="Password"
            variant="outlined"
            type="password"
            margin="normal"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <Button variant="contained" fullWidth onClick={handleSubmit} sx={{ mt: 2, backgroundColor: "#6A80B9" }}>Sign In</Button>

          <Typography variant="body2" sx={{ mt: 2, textAlign: "center" }}>
            Don’t have an account yet <a href="/register">Sign Up</a>
          </Typography>
        </form>
      </Box>
    </Container>
  );
}

export default Login;
