import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./component/PrivateRoute";
import Login from "./component/Login";
import Register from "./component/Register";
export default function App() {
  return (
    <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
    </AuthProvider>
  )
}