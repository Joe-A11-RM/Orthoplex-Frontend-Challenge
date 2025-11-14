import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  role: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoginData: (state, action) => {
      state.user = action.payload.user || null;
      state.role = action.payload.role || null;
    },
  },
});

export const { setLoginData } = authSlice.actions;

export default authSlice.reducer;
