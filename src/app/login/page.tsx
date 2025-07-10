"use client";
import React, { useState, useEffect } from "react";
import {
  AppBar,
  TextField,
  Button,
  ButtonGroup,
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
        <Typography px={1} variant="h5" color="inherit" textAlign="center" component="div">
          LOGIN
        </Typography>
      </AppBar>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{
          backgroundImage: "url('https://dailybing.com/api/v1')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{
            height: "45vh",
            gap: "20px"
          }}
        >
          <Grid
            size={4}
            sx={{
              flex: 1,
              display: "flex",
              height: "100%"
            }}
          >
            <Paper elevation={24} sx={{ padding: "20px", flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <Box display="flex" justifyContent="center" alignItems="center" gap="10px">
                <Avatar src="./favicon.ico"></Avatar>
                <Typography variant="h5">Kernal Master</Typography>
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
                <ButtonGroup fullWidth variant="outlined" aria-label="Login button group">
                  <Button
                    color="warning"
                    type="button"
                  >
                    I Forgot
                  </Button>
                  <Button
                    color="primary"
                    type="submit"
                  >
                    Log In
                  </Button>
                  <Button
                    color="secondary"
                    type="button"
                  >
                    New User
                  </Button>
                </ButtonGroup>
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
              flex: 1,
              height: "100%",
              display: "flex",
            }}
          >
            <Paper elevation={24} sx={{ padding: "20px", flexGrow: 1, display: "flex", flexDirection: "column" }}>
              <Typography variant="h4">Welcome to</Typography>
              <Typography variant="h3">Kernel Master</Typography>
              <Divider />
              <Typography variant="body1" paragraph>
                An operating platform designed for multi-region server assets management.
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
              <Box sx={{ flex: "1" }}></Box>
              <Link href="https://github.com/cdog-shen/kernel_master_ws">
                Read more...
              </Link>
            </Paper>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default App;
