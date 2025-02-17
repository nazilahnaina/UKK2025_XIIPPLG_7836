import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import { login } from "../api/auth";
import { useAuth } from "../context/AuthContext";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setEror] = useState("");
    const { login: setAuthUser } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const userData = await login(username, password);
            setAuthUser(userData)
            navigate("/tasks");
        } catch {
            setEror("Username atau password salah!");
        }
    };

    return (
        <Container maxWidth="xs">
            <Box textAlign="center" mt={10}>
                <Typography variant="h5">Sign In</Typography>
            </Box>

            {error && <Typography color="error">{error}</Typography>}

            <TextField label="Username" fullWidth margin="normal" onChange={(e) => setUsername(e.target.value)} />
            <TextField label="Password" type="password" fullWidth margin="normal" onChange={(e) => setPassword(e.target.value)} />

            <Button variant="contained" fullWidth onClick={handleLogin} sx={{ mt: 2 }}>Sign In</Button>

            <Typography variant="body2" sx={{ mt: 2, textAlign: "center" }}>
                Belum punya akun? <a href="/register">Sign Up</a>
            </Typography>

        </Container>
    )
}