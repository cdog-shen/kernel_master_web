"use client";
import React, { useState, useEffect } from "react";
import {
  AppBar,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Box,
  Paper,
  Typography,
  Alert,
  Divider,
  Link,
  Avatar,
  Stack,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { LoginFetch } from "@/fetch/control/user";

const App: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [isAlertVisible, setIsAlertVisible] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");

  const alertHandler = (message: string) => {
    setIsAlertVisible(!isAlertVisible);
    setAlertMessage(message);
  };

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const resp = await LoginFetch(username, password, rememberMe);
      if (resp.code !== 200) {
        console.log(resp);
        alertHandler("登陆失败.");
      } else {
        localStorage.setItem(
          "JWT",
          `${resp.data.token_type} ${resp.data.token}`
        );
        localStorage.setItem("uid", String(resp.data.uid));
        window.location.href = "/control/home";
      }
    } catch (error) {
      console.log(error);
      alertHandler("登陆失败.");
    }
  };

  return (
    <>
      <AppBar position="static" sx={{ padding: "10px", position: "fixed" }}>
        <Typography px={10} variant="h3" color="inherit" component="div">
          Login
        </Typography>
      </AppBar>
      <Box
        sx={{
          backgroundImage: "url('https://dailybing.com/api/v1')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
        }}
      >
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          minHeight="100vh"
          spacing={3}
        >
          <Grid
            size={4}
            sx={{
              minHeight: "40%",
              maxHeight: "50%",
              maxWidth: "25%",
              display: "flex",
            }}
          >
            <Paper elevation={24} sx={{ padding: "20px", flexGrow: 1 }}>
              <Box display="flex" justifyContent="center">
                <Avatar src="./favicon.ico"></Avatar>
              </Box>
              <Box px={2} py={1} component={"form"} onSubmit={handleLogin}>
                <TextField
                  fullWidth
                  label="Username"
                  variant="outlined"
                  margin="normal"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  variant="outlined"
                  margin="normal"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Box py={2} display="flex" justifyContent="center">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        color="primary"
                      />
                    }
                    label="Remember Me"
                  />
                </Box>
                <Stack
                  direction={"row"}
                  spacing={2}
                  divider={<Divider orientation="vertical" flexItem />}
                >
                  <Button
                    fullWidth
                    variant="contained"
                    color="warning"
                    type="button"
                  >
                    I Forgot
                  </Button>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    type="submit"
                  >
                    Log In
                  </Button>
                  <Button
                    fullWidth
                    variant="contained"
                    color="secondary"
                    type="button"
                  >
                    New User
                  </Button>
                </Stack>
              </Box>
              {isAlertVisible && (
                <Alert
                  severity="error"
                  onClose={() => {
                    alertHandler("");
                  }}
                >
                  {alertMessage}
                </Alert>
              )}
            </Paper>
          </Grid>
          <Grid
            size={4}
            sx={{
              minHeight: "40%",
              maxHeight: "50%",
              maxWidth: "25%",
              display: "flex",
            }}
          >
            <Paper elevation={24} sx={{ padding: "20px", flexGrow: 1 }}>
              <Typography variant="h4">Welcome to</Typography>
              <Typography variant="h3">Kernel master</Typography>
              <Divider />
              <Typography variant="body1" paragraph>
                It is an operating platform for managing multi-region server
                assets.
              </Typography>
              <Typography variant="h6" gutterBottom>
                Powered by:
              </Typography>
              <Typography variant="body1" paragraph>
                Rust actix as backend API
              </Typography>
              <Typography variant="body1" paragraph>
                React Next.js as frontend
              </Typography>
              <Typography variant="body1" paragraph>
                MySQL as database
              </Typography>
              <Typography variant="body1" align="right">
                -- Cdog Shen
              </Typography>
              <Link href="https://github.com/cdog-shen/kernel_master_ws">
                Read more...
              </Link>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default App;
