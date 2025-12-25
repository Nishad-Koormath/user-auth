import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: any | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  initialized: boolean; 
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
  initialized: false, 
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authStart(state) {
      state.loading = true;
      state.error = null;
    },

    authSuccess(state, action: PayloadAction<any>) {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
      state.initialized = true;
    },

    authFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      state.initialized = true;
    },

    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.initialized = true;
    },
  },
});

export const {
  authStart,
  authSuccess,
  authFailure,
  logout,
} = authSlice.actions;

export default authSlice.reducer;
