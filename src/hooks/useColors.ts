import { Color, Palette, useTheme } from "@mui/material";

export type ColorsType = {
  palette: Palette;
  globalBg: string;
  bg: string;
  grey: string;
  header: string;
  contrast: string;
  text: string;
};

export function useColors() {
  const theme = useTheme();
  const colors: ColorsType = {
    palette: theme.palette,
    globalBg: theme.palette.mode === "dark" ? "#0a0a0a" : theme.palette.secondary.main,
    bg: theme.palette.mode === "dark" ? theme.palette.grey[900] : "#ffffff",
    grey: theme.palette.mode === "dark" ? theme.palette.grey[700] : theme.palette.grey[200],
    header: theme.palette.mode === "dark" ? theme.palette.grey[800] : theme.palette.primary.main,
    contrast: theme.palette.mode === "dark" ? "#ffffff" : theme.palette.primary.main,
    text: theme.palette.mode === "dark" ? "#ffffff" : theme.palette.grey[900],
  };
  return colors;
}
