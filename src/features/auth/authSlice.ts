import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
  token: string | null;
  status: boolean;
};

const initialState: AuthState = {
  token: "",
  status: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<AuthState>) => {
      const { token, status } = action.payload;
      state.token = token;
      state.status = status;
    },
    logOut: (state) => {
      state.token = null;
      state.status = false;
    },
  },
});

export default authSlice.reducer;
export const { setCredentials, logOut } = authSlice.actions;
