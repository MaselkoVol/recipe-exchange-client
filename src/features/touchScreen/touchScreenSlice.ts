import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { isTouchScreen } from "../../utils/functions/isTouchScreen";

type TouchScreenState = {
  isTouchScreen: boolean;
};

const initialState: TouchScreenState = {
  isTouchScreen: isTouchScreen(),
};

const touchScreenSlice = createSlice({
  name: "touchScreen",
  initialState,
  reducers: {
    setTouch: (state) => {
      state.isTouchScreen = true;
    },
    setMouse: (state) => {
      state.isTouchScreen = false;
    },
  },
});

export default touchScreenSlice.reducer;
export const { setTouch, setMouse } = touchScreenSlice.actions;
