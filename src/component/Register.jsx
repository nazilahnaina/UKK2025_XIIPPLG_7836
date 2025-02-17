import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../api/auth"; 
import { Container, TextField, Button, Typography, Box } from "@mui/material";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    setError(""); 

    if (!username || !email || !name || !password || !confirmPassword) {
      setError("Semua kolom harus diisi.");
      return;
    }

    if (password.length < 8) {
      setError("Password minimal 8 karakter.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Konfirmasi password tidak cocok.");
      return;
    }

    try {
      await register({ username, email, name, password });
      navigate("/login"); 
    } catch {
      setError("Registrasi gagal, coba username lain.");
    }
  };

  return (
    <Container maxWidth="xs">
      <Box textAlign="center" mt={10}>
        <Typography variant="h5">Sign Up</Typography>
      </Box>

      {error && <Typography color="error" sx={{ textAlign: "center", mt: 2 }}>{error}</Typography>}

      <TextField label="Username" fullWidth margin="normal" onChange={(e) => setUsername(e.target.value)} />
      <TextField label="Email" type="email" fullWidth margin="normal" onChange={(e) => setEmail(e.target.value)} />
      <TextField label="Nama" fullWidth margin="normal" onChange={(e) => setName(e.target.value)} />
      <TextField label="Password" type="password" fullWidth margin="normal" onChange={(e) => setPassword(e.target.value)} />
      <TextField label="Konfirmasi Password" type="password" fullWidth margin="normal" onChange={(e) => setConfirmPassword(e.target.value)} />

      <Button variant="contained" fullWidth onClick={handleRegister} sx={{ mt: 2 }}>Sign Up</Button>

      <Typography variant="body2" sx={{ mt: 2, textAlign: "center" }}>
        Sudah punya akun? <a href="/login">Sign In</a>
      </Typography>
    </Container>
  );
}
