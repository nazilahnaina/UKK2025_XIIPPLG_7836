import React from "react";
import { Card, CardContent, Typography, Avatar, Button } from "@mui/material";
import Layout from "./Layout";
export default function PageProfil() {
  const user = {
    name: "User",
    email: "user@gmail.com",
    registeredAt: "18januari 2025",
    avatar: "https://via.placeholder.com/150",
  };

  return (
    <Layout>
      <Card sx={{ maxWidth: 400, mx: "auto", textAlign: "center", p: 2 }}>
        <Avatar src={user.avatar} sx={{ width: 100, height: 100, mx: "auto" }} />
        <CardContent>
          <Typography variant="h5" gutterBottom>{user.name}</Typography>
          <Typography variant="body1">📧 {user.email}</Typography>
          <Typography variant="body2">🗓 Bergabung sejak: {user.registeredAt}</Typography>
          <Button variant="contained" sx={{ mt: 2 }}>Edit Profil</Button>
        </CardContent>
      </Card>
    </Layout>
  );
}
