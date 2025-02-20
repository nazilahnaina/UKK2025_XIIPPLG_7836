import React, { useState, useEffect } from "react";
import { Card, CardContent, Avatar, Box, TextField, Grid } from "@mui/material"
import Layout from "./Layout";
export default function PageProfil() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    name: "",
    password: "",
    avatar: "https://via.placeholder.com/150",
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);

  return (
    <Layout>
      <Box display="flex" justifyContent="flex-start" alignItems="center" height="70vh" overflow="hidden" p={2}>
        <Card sx={{ width: 350, textAlign: "center", p: 2, boxShadow: 3, borderRadius: 3, ml: 5 }}>
          <Avatar src={user.avatar} sx={{ width: 80, height: 80, mb: 2, mx: "auto" }} />
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField label="Nama" variant="outlined" value={user.name} fullWidth disabled />
              </Grid>
              <Grid item xs={12}>
                <TextField label="Username" variant="outlined" value={user.username} fullWidth disabled />
              </Grid>
              <Grid item xs={12}>
                <TextField label="Email" variant="outlined" value={user.email} fullWidth disabled />
              </Grid>
              <Grid item xs={12}>
                <TextField label="Password" type="password" variant="outlined" value={user.password} fullWidth disabled />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </Layout>
  );
}
