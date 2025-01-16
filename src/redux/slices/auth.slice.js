import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  isLogged: false,
  uid: null,
  token: null,
  user: {
    role: 'user'
  }
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    handleAuthSlice: (state, action) => {
        return {
            ...state, ...action.payload
        }
    },
    handleAuthInitial: (state) => {
        return {
            ...initialState
        }
    }
  }
});

export const { handleAuthSlice, handleAuthInitial } = authSlice.actions;

export default authSlice.reducer;
