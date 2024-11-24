import { AlertProps } from "@mui/material";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import React from "react";

export type SnackBarElement = {
  severity: "success" | "info" | "warning" | "error";
  text: string;
  livingTime: number; // ms
};

export type SnackBarElementExtended = SnackBarElement & {
  id: string;
};

type SnackBarState = {
  elements: SnackBarElementExtended[];
};

const initialState: SnackBarState = {
  elements: [],
};

const snackBarSlice = createSlice({
  name: "snackBar",
  initialState,
  reducers: {
    addToSnackBar: (state, action: PayloadAction<SnackBarElement>) => {
      if (state.elements.length > 5) {
        state.elements = [...state.elements.slice(1), { ...action.payload, id: String(Date.now()) + Math.random() }];
      } else {
        state.elements = [...state.elements, { ...action.payload, id: String(Date.now()) + Math.random() }];
      }
    },
    removeFromSnackBar: (state, action: PayloadAction<SnackBarElementExtended>) => {
      state.elements = state.elements.filter((element) => element.id !== action.payload.id);
    },
  },
});

export default snackBarSlice.reducer;

export const { addToSnackBar, removeFromSnackBar } = snackBarSlice.actions;
