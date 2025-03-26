
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: !!localStorage.getItem("token"),
  user: JSON.parse(localStorage.getItem("user")) || null,
  userId: localStorage.getItem("userId") ? localStorage.getItem("userId").replace(/^"|"$/g, "").trim() : "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
      state.userId = action.payload.user.id;

      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("userId", JSON.stringify(action.payload.user.id));
    },

    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.userId = "";

      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("userId");
    },

   
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      localStorage.setItem("user", JSON.stringify(state.user)); 
    },
  },
});

export const { loginSuccess, logout, updateUser } = authSlice.actions; 
export default authSlice.reducer;
