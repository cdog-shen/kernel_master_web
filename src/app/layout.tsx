// src/app/layout.tsx
"use client";

import { useState, useEffect } from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { createAppTheme } from "@/theme/config";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [darkMode, setDarkMode] = useState(false);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const theme = createAppTheme(darkMode ? "dark" : "light");

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <html lang="cn" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </head>
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme}>
            <CssBaseline />

            {/* 主内容区 */}
            <Box
              sx={{
                minHeight: "100vh",
                minWidth: "100vw",
                backgroundColor: "background.default",
              }}
            >
              {children}
            </Box>

            <Box
              sx={{
                position: "fixed",
                bottom: 32,
                right: 32,
                zIndex: 1000,
              }}
            >
              <IconButton
                onClick={() => setDarkMode(!darkMode)}
                color="inherit"
                sx={{
                  bgcolor: "background.paper",
                  borderRadius: "50%",
                  boxShadow: 3,
                  "&:hover": {
                    bgcolor: "action.hover",
                  },
                }}
              >
                {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
            </Box>

            {/* 页脚 */}
            <Box
              component="footer"
              sx={{
                py: 2,
                px: 2,
                mt: "auto",
                backgroundColor: "background.paper",
                // position: "fixed",
                bottom: 0,
                width: "100%",
              }}
            >
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
                spacing={2}
              >
                <Grid size={12}>
                  <Box display="flex" justifyContent="center">
                    <Typography variant="body2" color="text.secondary">
                      © {currentYear} Cdog Shen. All rights reserved.
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
