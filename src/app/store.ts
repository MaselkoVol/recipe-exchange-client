import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "../features/theme/themeSlice";
import { api } from "./services/api";
import { setupListeners } from "@reduxjs/toolkit/query";
import authSlice from "../features/auth/authSlice";
import touchScreenSlice from "../features/touchScreen/touchScreenSlice";
import snackbarSlice from "../features/snackbar/snackbarSlice";

export const store = configureStore({
  reducer: {
    snackBar: snackbarSlice,
    touchScreen: touchScreenSlice,
    theme: themeSlice,
    auth: authSlice,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
