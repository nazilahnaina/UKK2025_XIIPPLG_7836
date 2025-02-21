
import { useState } from "react";
import { TextField, Button, Container, Typography, Box, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmation: "",
    email: "",
    name: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const form = new FormData();
    form.append("username", formData.username);
    form.append("password", formData.password);
    form.append("confirmation", formData.confirmation);
    form.append("email", formData.email);
    form.append("name", formData.name);

    try {
      const response = await fetch(
        "https://listyantidewi.pythonanywhere.com/register",
        {
          method: "POST",
          body: form,
        }
      );

      const data = await response.text();

      if (response.ok) {
        console.log("Registration successful:", data);
        navigate("/");
      } else {
        setError(data);
        console.error("Registration failed:", data);
      }
    } catch (error) {
      setError("Network error occurred");
      console.error("Error during registration:", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box display="flex" flexDirection="column" alignItems="center" mt={6}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Sign Up
        </Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <TextField
            fullWidth
            label="Nama Lengkap"
            variant="outlined"
            margin="normal"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
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
            label="Email"
            type="email"
            variant="outlined"
            margin="normal"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            label="Konfirmasi Password"
            type="password"
            variant="outlined"
            margin="normal"
            name="confirmation"
            value={formData.confirmation}
            onChange={handleChange}
            required
          />
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2, backgroundColor: "#6A80B9" }}>
            Sign Up
          </Button>

          <Typography variant="body2" sx={{ mt: 2, textAlign: "center" }}>
            Already have an account? <a href="/">Sign In</a>
          </Typography>
        </form>
      </Box>
    </Container>
  );
}

export default Register;
