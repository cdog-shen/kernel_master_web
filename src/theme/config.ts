// src/theme/config.ts
import { createTheme } from "@mui/material/styles";
import { blue, amber, grey } from "@mui/material/colors";

export const getDesignTokens = (mode: "light" | "dark") => ({
  palette: {
    mode,
    primary: {
      main: mode === "light" ? blue[700] : amber[500],
    },
    background: {
      default: mode === "light" ? "#f5f5f5" : grey[900],
      paper: mode === "light" ? "#ffffff" : grey[800],
    },
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
});

// 公共组件配置
export const componentOverrides = {
  MuiLink: {
    defaultProps: {
      underline: "hover" as const,
    },
  },
  MuiButton: {
    styleOverrides: {
      root: {
        textTransform: "none",
      },
    },
  },
};

// 创建完整主题
export const createAppTheme = (mode: "light" | "dark") => {
  return createTheme({
    ...getDesignTokens(mode),
    ...componentOverrides,
  });
};
