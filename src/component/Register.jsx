import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../api/auth";
import { Container, TextField, Button, Typography, Box } from "@mui/material";

export default function Register() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    name: "",
    password: "",
    confirmation: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
  
    // Validasi input
    if (!user.username || !user.email || !user.name || !user.password || !user.confirmation) {
      setError("Semua kolom harus diisi.");
      return;
    }
  
    if (user.password.length < 8) {
      setError("Password minimal 8 karakter.");
      return;
    }
  
    if (user.password !== user.confirmation) {
      setError("Konfirmasi password tidak cocok.");
      return;
    }
  
    console.log("Data yang dikirim:", user); // 🔍 Cek data sebelum dikirim
  
    try {
      await register(user);
      console.log("Registrasi berhasil!");
      navigate("/login");
    } catch (error) {
      setError(error.message || "Registrasi gagal, coba username lain.");
    }
  };
  
  return (
    <Container maxWidth="xs">
      <Box textAlign="center" mt={10}>
        <Typography variant="h5">Sign Up</Typography>
      </Box>

      {error && (
        <Typography color="error" sx={{ textAlign: "center", mt: 2 }}>
          {error}
        </Typography>
      )}

      <form onSubmit={handleRegister}>
        <TextField label="Username" name="username" fullWidth margin="normal" onChange={handleChange} />
        <TextField label="Email" name="email" type="email" fullWidth margin="normal" onChange={handleChange} />
        <TextField label="Name" name="name" fullWidth margin="normal" onChange={handleChange} />
        <TextField label="Password" name="password" type="password" fullWidth margin="normal" onChange={handleChange} />
        <TextField label="Confirmation Password" name="confirmation" type="password" fullWidth margin="normal" onChange={handleChange} />

        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          Sign Up
        </Button>
      </form>

      <Typography variant="body2" sx={{ mt: 2, textAlign: "center" }}>
        Already have an account? <a href="/login">Sign In</a>
      </Typography>
    </Container>
  );
}
