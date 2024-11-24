import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ThemeState = {
  value: "light" | "dark";
};

const initialState: ThemeState = {
  value: localStorage.getItem("theme") === "dark" ? "dark" : "light",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<"dark" | "light">) => {
      state.value = action.payload;
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
