// src/theme/types.d.ts
import { Theme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface CustomTheme extends Theme {
    custom?: {
      spacingFactor: number;
    };
  }

  interface CustomThemeOptions {
    custom?: {
      spacingFactor?: number;
    };
  }

  export function createTheme(options?: CustomThemeOptions): CustomTheme;
}
