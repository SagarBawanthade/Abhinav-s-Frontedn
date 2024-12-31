// authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: null,
  token: null,
  role: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
     
      state.id = action.payload.id;
      state.token = action.payload.token;
      state.role = action.payload.role;
    },
    logout: (state) => {
   
      state.id = null;
      state.token = null;
      state.role = null;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
