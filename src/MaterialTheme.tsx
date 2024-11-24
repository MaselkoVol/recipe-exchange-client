import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useSelector } from "react-redux";
import { RootState } from "./app/store";

const greyColors = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      light: "#939ed5",
      main: "#7986cb",
      dark: "#545d8e",
    },
    secondary: {
      light: "#eceef7",
      main: "#e8eaf6",
      dark: "#a2a3ac",
    },
    grey: greyColors,
  },
});
const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      light: "#939ed5",
      main: "#7986cb",
      dark: "#545d8e",
    },
    secondary: {
      light: "#eceef7",
      main: "#e8eaf6",
      dark: "#a2a3ac",
    },
    grey: greyColors,
  },
});

const MaterialTheme = ({ children }: { children: React.ReactNode }) => {
  const themeMode = useSelector((state: RootState) => state.theme.value);
  return (
    <ThemeProvider theme={themeMode === "dark" ? darkTheme : lightTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default MaterialTheme;
