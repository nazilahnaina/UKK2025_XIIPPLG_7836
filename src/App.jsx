import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./component/PrivateRoute";
import Login from "./component/Login";
import Register from "./component/Register";
import Navbar from "./component/Navbar";
import Layout from "./component/Layout";
import Tasks from "./component/home/PageTasks";
export default function App() {
  return (
    <AuthProvider>
    <Router>
      <Routes>
         <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} /> 

        <Route path="/" element={<Navigate to="/Layout"></Navigate>} />
        <Route path="=/tasksk" element={<Tasks />} />
      
        
      </Routes>
    </Router>
    </AuthProvider>
  )
}