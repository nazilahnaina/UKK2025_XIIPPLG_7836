import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Logout } from "@mui/icons-material";
import { indigo } from "../theme/color";
import { useNavigate } from "react-router-dom";


const Navbar = ({ onLogout }) => {
  const navigate = useNavigate('');

  const handleLogout = () => {
    alert('Anda berhasil logout!')
    navigate('/')
     console.log('coba logout');
  }

  return (
    <AppBar position="fixed" sx={{ backgroundColor: indigo[400], width: "100vw", zIndex: 1201, boxShadow: 3 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", letterSpacing: 1, ml: 2 }}>
          MyTodoList
        </Typography>
        <Box>
          <Button
            color="inherit"
            onClick={handleLogout}
            startIcon={<Logout />}
            sx={{
              borderRadius: "20px",
              padding: "8px 20px",
              textTransform: "none",
              fontWeight: "bold",
              backgroundColor: indigo[500],
              transition: "0.3s",
              "&:hover": {
                backgroundColor: indigo[700],
                transform: "scale(1.05)",
              },
            }}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
