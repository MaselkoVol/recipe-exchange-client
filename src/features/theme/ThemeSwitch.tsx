import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { setTheme } from "./themeSlice";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { DarkMode, LightMode } from "@mui/icons-material";

const ThemeSwitch = () => {
  const currentTheme = useSelector((selector: RootState) => selector.theme.value);
  const dispatch = useDispatch<AppDispatch>();
  function toggleTheme(event: React.MouseEvent, value: any) {
    if (value !== null) {
      dispatch(setTheme(value));
      localStorage.setItem("theme", value);
    }
  }
  return (
    <ToggleButtonGroup
      size="small"
      color="secondary"
      value={currentTheme}
      onChange={toggleTheme}
      aria-label="theme"
      exclusive
    >
      <ToggleButton sx={{ borderRadius: 3, borderColor: "transparent" }} value="light">
        <LightMode />
      </ToggleButton>
      <ToggleButton sx={{ borderRadius: 3, borderColor: "transparent" }} value="dark">
        <DarkMode />
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default ThemeSwitch;
