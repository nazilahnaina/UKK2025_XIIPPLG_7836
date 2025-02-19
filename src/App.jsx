import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./component/PrivateRoute";
import Login from "./component/Login";
import Register from "./component/Register";
import Navbar from "./component/Navbar";
import Layout from "./component/Layout";
import PageTasks from "./component/PageTasks";
import PageProfil from "./component/PageProfil";
import { CommentBank } from "@mui/icons-material";

export default function App() {
  return (          
    <AuthProvider>
    <Router>
      <Routes>
         <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />  
         {/* <Route path="/" element={<Navigate to="/PageTasks" />} />   */}
          <Route path="/layout" element={<Layout/>} /> 
         <Route path="/tasks" element={<PageTasks/>} />
         <Route path="/profil" element={<PageProfil/>} />

      </Routes>
    </Router>
    </AuthProvider>
  )
}




// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import PageTasks from "./component/PageTasks";
// import PageProfil from "./component/PageProfil";


// export default function App() {
//   return (
//     <Router>
//       <Routes>
        
//         <Route path="/" element={<Navigate to="/pagetasks" />} /> 
//         <Route path="/tasks" element={<PageTasks />} />
//         <Route path="/profil" element={<PageProfil />} /> 

//       </Routes>
//     </Router>
//   );
// }
