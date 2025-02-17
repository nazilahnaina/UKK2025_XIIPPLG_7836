import React from "react";
import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <Box sx={{ display: "flex" }}>
    
      <Navbar />

      <Sidebar />

      <Box sx={{ flexGrow: 1, p: 3, mt: "64px",}}>
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
