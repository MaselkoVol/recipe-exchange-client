import React, { useEffect, useMemo, useState } from "react";
import Header from "./components/Header";
import { Alert, Box, List, ListItem, Palette, PaletteColor, useTheme } from "@mui/material";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import { useRefreshMutation } from "./app/services/authApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "./features/auth/authSlice";
import { isTouchScreen } from "./utils/functions/isTouchScreen";
import { setMouse, setTouch } from "./features/touchScreen/touchScreenSlice";
import SnackBar from "./features/snackbar/SnackBar";
import { useColors } from "./hooks/useColors";

function App() {
  const dispatch = useDispatch();
  const [refresh] = useRefreshMutation();
  const colors = useColors();
  const authCheck = async () => {
    const res = await refresh();
    if (res.data) {
      dispatch(setCredentials({ token: res.data, status: true }));
    }
  };
  const isTouchScreenCheck = () => {
    if (isTouchScreen()) {
      dispatch(setTouch());
    } else {
      dispatch(setMouse());
    }
  };
  function changeColor() {
    const root = document.documentElement;
    root.style.setProperty(`--primary-main`, colors.palette.primary.main);
    root.style.setProperty(`--grey-700`, colors.palette.grey[700]);
  }

  useEffect(() => {
    changeColor();
    authCheck();
    isTouchScreenCheck();
  }, []);

  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        bgcolor: theme.palette.mode === "dark" ? "#0a0a0a" : theme.palette.secondary.main,
        minHeight: "100vh",
        minWidth: 300,
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Header />
      <main style={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background:
              theme.palette.mode === "dark"
                ? "radial-gradient(circle, rgba(62,9,121,0.1) 1%, rgba(255,255,255,0) 100%)"
                : "radial-gradient(circle, rgba(221,221,221,0.1) 1%, rgba(255,255,255,0) 100%)",
          }}
        ></Box>
        <SnackBar />
        <Box sx={{ display: "flex", flex: 1, flexDirection: "column", zIndex: 10 }}>
          <Outlet />
        </Box>
      </main>
    </Box>
  );
}

export default App;
